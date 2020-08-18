const express = require("express");

const socketio = require("socket.io");

const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();

const server = http.createServer(app);

const cors = require("cors");

const { addUser, removeUser, getUser, getUsersinRoom } = require("./users.js");

//Instance of socket-io
const io = socketio(server);

app.use(router);
app.use(cors());

io.on("connection", socket => {
  console.log("We have a new connection!!!");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }
    // A message event is sent to client and those messages are broadcasted and displayed
    //For the current logged in user
    socket.emit("message", {
      user: "admin",
      text: `Hi ${user.name}, welcome to ${user.room}, Hope you are having a good day`
    });
    //Broadcast to everyone in the room
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersinRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersinRoom(user.room)
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`
      });
    }
    console.log("User had left!!!");
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
