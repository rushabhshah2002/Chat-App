import React, { useState, useEffect } from "react";
import { uid } from "uid/secure";
import {
  UC,
  UCContainer,
  UCImage,
  UCInfo,
  UCName,
} from "../Styles/ChatDir.styles";
import GroupIcon from "../assets/imgs/multiple-users-silhouette.svg";
const UserChats = ({
  user,
  chats,
  selectedChats,
  setSelectedChats,
  deleteChat,
}) => {
  const onMessageSelect = (chat) => {
    let arr = selectedChats;
    console.log(selectedChats);
    console.log(chat);
    let chatInfo = {
      username: user.username,
      friend: chat.receiverName,
      last_updated: chat.last_updated,
      type: chat.type,
      groupid: chat.groupid,
    };
    console.log(selectedChats.indexOf(chatInfo) === -1);
    if (selectedChats.indexOf(chatInfo) === -1) {
      arr.push({
        username: user.username,
        friend: chat.receiverName,
        last_updated: chat.last_updated,
        type: chat.type,
        groupid: chat.groupid,
      });
    } else {
      arr.splice(arr.indexOf(chat), 1);
    }
    setSelectedChats(arr);
    console.log(arr);
  };

  return (
    <UCContainer>
      {chats.map((chat, i) => {
        return (
          <UC key={uid()} id={i}>
            <UCInfo className="">
              {chat.type === "private" ? (
                <UCImage src={chat.image_url} alt="private" />
              ) : (
                <UCImage src={GroupIcon} alt="" />
              )}
              <UCName
                to={
                  chat.type === "private"
                    ? `/dm/${chat.username}`
                    : `/group/${chat.groupid}/${chat.receiverName}`
                }
                key={uid()}
              >
                {chat.receiverName}
              </UCName>
            </UCInfo>
            {deleteChat ? (
              <label key={uid()}>
                {selectedChats.indexOf({
                  username: user.username,
                  friend: chat.receiverName,
                  last_updated: chat.last_updated,
                  type: chat.type,
                  groupid: chat.groupid,
                }) !== -1 ? (
                  <span>123</span>
                ) : (
                  <span>
                    {selectedChats.indexOf({
                      username: user.username,
                      friend: chat.receiverName,
                      last_updated: chat.last_updated,
                      type: chat.type,
                      groupid: chat.groupid,
                    })}
                  </span>
                )}
                <input
                  type="checkbox"
                  name=""
                  id=""
                  key={uid()}
                  onClick={() => onMessageSelect(chat)}
                />
              </label>
            ) : null}
          </UC>
        );
      })}
    </UCContainer>
  );
};

export default UserChats;
