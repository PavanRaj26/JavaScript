import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";

import Input from "../Input/Input";

import Messages from "../Messages/Messages";

import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const [roomData, setRoomData] = useState("");
  const [message, setMessage] = useState("");

  const ENDPPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", roomData => {
      console.log(roomData);
    });
  }, [roomData]);
  //Function for sending messages
  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {/* <input value={message} 
                onChange={(event) => setMessage(event.target.value)}
                 onKeyPress={event=>event.key==='Enter'?sendMessage(event):null} 
                /> */}
        <TextContainer userData={roomData} />
      </div>
    </div>
  );
};

export default Chat;
