import React from "react";

import "./TextContainer.css";

const TextContainer = ({ userData: { room, users } }) => {
  console.log(room, users);
  return null;
  //   return users.map(user => <div> {user}</div>);
};

export default TextContainer;
