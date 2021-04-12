import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import ChatDirNav from "../Components/ChatDirNav.component";
import UserChats from "../Components/UserChats.component";
let socket;
const ChatDir = ({ user, setUser }) => {
  const [chats, setChat] = useState([]);
  const [selectedChats, setSelectedChats] = useState([]);
  const [deleteChat, setDeleteChat] = useState(false);
  const history = useHistory();

  useEffect(() => {
    socket = io("127.0.0.1:3003", { transports: ["websocket"] });
  }, []);

  const fetchChats = () => {
    fetch(`http://localhost:5005/chatList?username=${user.username}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((user) => {
        setChat(user);
      });
  };

  useEffect(() => {
    fetchChats();
    socket.emit("user_connected", {
      username: user.username,
      currentPosition: "chatdir",
      id: null,
    });
  }, []);
  useEffect(() => {
    socket.on("group-noti", (data) => {
      switch (data.type) {
        case "new group":
          console.log(data);
          history.push(`/group/${data.content.groupid}`);
          break;
        case "new member":
          fetchChats();
          break;
        default:
          break;
      }
    });
    //return socket.close
  }, []);

  return (
    <div className="">
      <ChatDirNav
        deleteChat={deleteChat}
        setDeleteChat={setDeleteChat}
        setSelectedChats={setSelectedChats}
        selectedChats={selectedChats}
        fetchChats={fetchChats}
        user={user}
        setUser={setUser}
      />
      <UserChats
        user={user}
        chats={chats}
        deleteChat={deleteChat}
        selectedChats={selectedChats}
        setSelectedChats={setSelectedChats}
      />
    </div>
  );
};

export default ChatDir;
