import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import { useHistory, useParams } from "react-router-dom";
import { uid } from "uid";
import { Link } from "react-router-dom";
import GroupIcon from "../assets/imgs/multiple-users-silhouette.svg";
import {
  NavBar,
  NavBarBTN,
  NavBarChatName,
  NavBarImage,
  NavBarItemsLeft,
  NavBarItemsRight,
  MsgContainer,
  Msg,
  MSGImage,
  MsgText,
  Announcement,
  SCContainer,
  SCInput,
  SCBtn,
  SCLabel,
  MSGSVG,
  MSGLabel,
} from "../Styles/Chat.styles";
import { NavLinkSVG } from "../Styles/ChatDir.styles";
import CreateNoti from "../utils/CreateNoti.utils";
let socket;

const PrivateChat = ({ user }) => {
  const { id, type, groupName } = useParams();
  const msgsEl = useRef(null);
  const div = useRef(null);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      sender: "",
      reciever: "",
      text: "",
    },
  ]);
  const [num, setNum] = useState(0);
  const [membersInfo, setMembersInfo] = useState({});
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const history = useHistory();
  const [isUserAllow, setIsUserAllow] = useState(true);
  const [currentMsg, setCurrentMsg] = useState("");
  const getAllMessages = () => {
    if (type === "dm") {
      fetch(
        `http://localhost:5005/allPrivateMessages?user=${user}&friend=${id}`,
        {
          method: "GET",
          params: {
            user,
            friend: id,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setMsgs(data);
        });
    } else if (type === "group") {
      fetch("http://localhost:5005/group/allGroupMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupid: id,
          username: user,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMsgs(data.chats);
          if (data.left_date) {
            setIsUserAllow(false);
          }
        })
        .catch((err) => {
          if (err.toString().includes(401)) {
            setIsUserAllow(false);
            history.push("/chatdir");
          }
        });
    }
  };
  useEffect(() => {
    socket = io("127.0.0.1:3003", { transports: ["websocket"] });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      CreateNoti({
        title: "",
        msg: "Click the chat message to copy",
        type: "info",
        component: null,
      });
    }, 500);
    if (type === "group" && user) {
      socket.emit("user_connected", {
        username: user,
        currentPosition: "group",
        id,
      });
      socket.emit("on-groupchat", {
        groupid: id,
        username: user,
      });
    } else if (type === "dm") {
      socket.emit("on-privatechat", {
        user,
        friend: id,
      });
      socket.emit("user_connected", {
        username: user,
        currentPosition: "private",
        id,
      });
    }

    getAllMessages();
    //return socket.disconnect()
  }, []);
  useEffect(() => {
    console.log(123,type)
    if (type === "dm") {
      console.log("bye")
      console.log(user)
      for (let i of [user, id])
        fetch(`http://localhost:5005/get/photo?username=${i}`)
          .then((response) => response.json())
          .then(({ user }) => {
            console.log(user)
            setMembersInfo({ [user.username]: user });
          });
    }
    else {
      console.log("hello")
      for (let i of [user, id])
        fetch(`http://localhost:5005/group/info/members?groupid=${i}`)
          .then((response) => response.json())
          .then(( members ) => {
            // console.log(members)
            for(let member of members){
              console.log(member)
              setMembersInfo((memberInfo) => ({...memberInfo,[member.username]:member}))
            }
            console.log(membersInfo)
          });
    }
  }, []);
  useEffect(() => {
    socket.on("new-message", (data) => {
      if (data.sender === id || data.sender === user) {
        getAllMessages();
        currentMsg === " " ? setCurrentMsg("") : setCurrentMsg(" ");
      } else {
        alert(`${data.sender} has send you a msg`);
      }
    });
    socket.on("group-noti", (data) => {
      switch (data.type) {
        case "new message":
          if (id === data.content.groupid) {
            getAllMessages();
          } else {
            alert(`${data.content.sender} has send a msg`);
          }
          break;
        case "delete member":
          if (id === data.content.groupid) {
            getAllMessages();
          }
          break;
        default:
          break;
      }
    });

    //return socket.close
  }, []);
  const onMessageSelect = (chatid) => {
    let arr = selectedMessages;
    if (arr.indexOf(chatid) === -1) {
      arr.push(chatid);
      setNum(num + 1);
    } else {
      arr.splice(arr.indexOf(chatid), 1);
      setNum(num - 1);
    }
    setSelectedMessages(arr);
  };
  useEffect(() => {
    if (msgsEl) {
      msgsEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  const onDeleteMessage = () => {
    if (selectedMessages.length > 0) {
      fetch("http://localhost:5005/delete/specific", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatids: selectedMessages,
          username: user,
          type: type === "group" ? "group" : "private",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          getAllMessages();

          setSelectedMessages([]);
          setDeleteMsg(false);
        });
    }
  };
  const onClickHandle = () => {
    if (currentMsg.length > 0) {
      if (type === "dm") {
        const data = {
          sender: user,
          receiver: id,
          text: currentMsg,
        };
        socket.emit("send-private", data);
        const msgArr = msgs;
        msgArr.push({
          ...data,
          Id: uid(),
          time: Date(),
        });

        setMsgs(msgArr);
        setCurrentMsg("");
      } else {
        const data = {
          sender: user,
          groupid: id,
          text: currentMsg,
        };
        socket.emit("send-group", data);
        const msgArr = msgs;
        msgArr.push({
          ...data,
          Id: uid(),
          time: Date(),
        });
        setMsgs(msgArr);
        setCurrentMsg("");
      }
    }
    // div.current.scrollIntoView();
    // const scrollHeight = msgsEl.scrollHeight;
    // const height = msgsEl.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // msgsEl.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const setMsg = ({ target }) => {
    if (currentMsg === " ") {
      setCurrentMsg("");
    } else {
      setCurrentMsg(target.value);
    }
    return () => setCurrentMsg(currentMsg);
  };
  const onkeyPress = (e) => {
    if (e.key === "Enter") {
      onClickHandle();
    }
  };
  const onMsgClick = async (msg) => {
    await navigator.clipboard.writeText(msg);
    CreateNoti({
      title: "",
      msg: `succefully copied ${msg}`,
      type: "success",
      component: null,
    });
  };
  return (
    <div className="">
      <NavBar>
        <NavBarItemsLeft className="">
          <NavBarBTN onClick={() => history.push("/")}>
            <NavLinkSVG
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 219.151 219.151"
              style={{ enableBackground: "new 0 0 219.151 219.151" }}
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
		C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
		c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"
                />
                <path
                  d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
		c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
		c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
		c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"
                />
              </g>
            </NavLinkSVG>
          </NavBarBTN>
          {membersInfo[id] ? (
            <NavBarImage src={membersInfo[id].image_url} alt="" />
          ) : (
            <NavBarImage src={GroupIcon} alt={"GroupIcon"} />
          )}
          <NavBarChatName>{type === "dm" ? id : groupName}</NavBarChatName>
        </NavBarItemsLeft>
        <NavBarItemsRight className="">
          <NavBarBTN
            disabled={!deleteMsg ? true : false}
            style={{
              opacity: !deleteMsg ? "0" : "100%",
              transition: "all .3s ease-out",
              cursor: deleteMsg ? "pointer" : "default",
            }}
            onClick={onDeleteMessage}
          >
            <NavLinkSVG
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 332.003 332.003"
              style={{ enableBackground: "new 0 0 332.003 332.003" }}
              xmlSpace="preserve"
            >
              <title>Delete Chat Msg</title>
              <g>
                <g>
                  <path
                    d="M273.93,8.29h-75.561C196.64,3.461,192.035,0,186.61,0h-41.218c-5.424,0-10.027,3.461-11.758,8.29H58.073
			c-19.063,0-34.572,15.509-34.572,34.571v31.448c0,6.903,5.597,12.5,12.5,12.5H59.51v232.694c0,6.903,5.597,12.5,12.5,12.5h187.982
			c6.902,0,12.5-5.597,12.5-12.5V86.81h23.51c6.903,0,12.5-5.597,12.5-12.5V42.862C308.502,23.799,292.993,8.29,273.93,8.29z
			 M247.493,307.004H84.511V86.81h162.982V307.004z M283.502,61.81h-235V42.862c0-5.277,4.293-9.571,9.572-9.571h215.855
			c5.277,0,9.572,4.294,9.572,9.571L283.502,61.81L283.502,61.81z"
                  />
                  <path
                    d="M133.245,263.873c6.903,0,12.5-5.598,12.5-12.5V119.638c0-6.903-5.597-12.5-12.5-12.5c-6.903,0-12.5,5.597-12.5,12.5
			v131.735C120.745,258.275,126.342,263.873,133.245,263.873z"
                  />
                  <path
                    d="M198.759,263.873c6.903,0,12.5-5.598,12.5-12.5V119.638c0-6.903-5.597-12.5-12.5-12.5c-6.902,0-12.5,5.597-12.5,12.5
			v131.735C186.259,258.275,191.856,263.873,198.759,263.873z"
                  />
                </g>
              </g>
            </NavLinkSVG>
          </NavBarBTN>

          <NavBarBTN
            onClick={() => {
              setDeleteMsg(!deleteMsg);
              setSelectedMessages([]);
            }}
          >
            {!deleteMsg ? (
              <NavLinkSVG
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 332.003 332.003"
                style={{ enableBackground: "new 0 0 332.003 332.003" }}
                xmlSpace="preserve"
              >
                <title>Delete Chat Msg</title>
                <g>
                  <g>
                    <path
                      d="M273.93,8.29h-75.561C196.64,3.461,192.035,0,186.61,0h-41.218c-5.424,0-10.027,3.461-11.758,8.29H58.073
			c-19.063,0-34.572,15.509-34.572,34.571v31.448c0,6.903,5.597,12.5,12.5,12.5H59.51v232.694c0,6.903,5.597,12.5,12.5,12.5h187.982
			c6.902,0,12.5-5.597,12.5-12.5V86.81h23.51c6.903,0,12.5-5.597,12.5-12.5V42.862C308.502,23.799,292.993,8.29,273.93,8.29z
			 M247.493,307.004H84.511V86.81h162.982V307.004z M283.502,61.81h-235V42.862c0-5.277,4.293-9.571,9.572-9.571h215.855
			c5.277,0,9.572,4.294,9.572,9.571L283.502,61.81L283.502,61.81z"
                    />
                    <path
                      d="M133.245,263.873c6.903,0,12.5-5.598,12.5-12.5V119.638c0-6.903-5.597-12.5-12.5-12.5c-6.903,0-12.5,5.597-12.5,12.5
			v131.735C120.745,258.275,126.342,263.873,133.245,263.873z"
                    />
                    <path
                      d="M198.759,263.873c6.903,0,12.5-5.598,12.5-12.5V119.638c0-6.903-5.597-12.5-12.5-12.5c-6.902,0-12.5,5.597-12.5,12.5
			v131.735C186.259,258.275,191.856,263.873,198.759,263.873z"
                    />
                  </g>
                </g>
              </NavLinkSVG>
            ) : (
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C114.508,0,0,114.497,0,256c0,141.493,114.497,256,256,256c141.492,0,256-114.497,256-256
			C512,114.507,397.503,0,256,0z M256,472c-119.384,0-216-96.607-216-216c0-119.385,96.607-216,216-216
			c119.384,0,216,96.607,216,216C472,375.385,375.393,472,256,472z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M343.586,315.302L284.284,256l59.302-59.302c7.81-7.81,7.811-20.473,0.001-28.284c-7.812-7.811-20.475-7.81-28.284,0
			L256,227.716l-59.303-59.302c-7.809-7.811-20.474-7.811-28.284,0c-7.81,7.811-7.81,20.474,0.001,28.284L227.716,256
			l-59.302,59.302c-7.811,7.811-7.812,20.474-0.001,28.284c7.813,7.812,20.476,7.809,28.284,0L256,284.284l59.303,59.302
			c7.808,7.81,20.473,7.811,28.284,0C351.398,335.775,351.397,323.112,343.586,315.302z"
                    />
                  </g>
                </g>
              </svg>
            )}
          </NavBarBTN>
          {type === "group" ? (
            <NavBarBTN onClick={() => history.push(`/${id}/edit`)}>
              <NavLinkSVG
                id="Layer_1"
                enable-background="new 0 0 24 24"
                height="512"
                viewBox="0 0 24 24"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m13.12 24h-2.24c-.757 0-1.396-.567-1.486-1.32l-.239-1.876c-.477-.155-.937-.346-1.374-.569l-1.494 1.161c-.606.469-1.459.415-1.985-.126l-1.575-1.575c-.537-.521-.591-1.374-.122-1.979l1.161-1.495c-.224-.437-.415-.897-.569-1.374l-1.88-.239c-.75-.092-1.317-.731-1.317-1.488v-2.24c0-.757.567-1.396 1.32-1.486l1.876-.239c.155-.477.346-.937.569-1.374l-1.16-1.494c-.47-.606-.415-1.46.127-1.986l1.575-1.575c.521-.537 1.375-.59 1.979-.122l1.494 1.162c.437-.223.897-.414 1.375-.569l.239-1.88c.09-.75.729-1.317 1.486-1.317h2.24c.757 0 1.396.567 1.486 1.32l.239 1.876c.478.155.938.346 1.375.569l1.494-1.161c.607-.469 1.459-.415 1.985.127l1.575 1.575c.537.521.591 1.374.122 1.979l-1.161 1.495c.224.437.415.897.569 1.374l1.88.239c.749.091 1.316.73 1.316 1.487v2.24c0 .757-.567 1.396-1.32 1.486l-1.876.239c-.155.477-.346.937-.569 1.374l1.161 1.494c.47.606.415 1.459-.127 1.985l-1.575 1.575c-.521.537-1.375.592-1.979.122l-1.495-1.161c-.437.224-.897.415-1.374.569l-.239 1.88c-.091.75-.73 1.317-1.487 1.317zm-5.39-4.86c.083 0 .168.021.244.063.551.308 1.148.556 1.774.736.192.055.333.219.358.417l.28 2.2c.03.251.247.444.494.444h2.24c.247 0 .464-.193.493-.439l.281-2.204c.025-.198.166-.362.358-.417.626-.18 1.223-.428 1.774-.736.175-.098.393-.081.55.042l1.75 1.36c.201.156.483.143.655-.034l1.585-1.585c.181-.176.195-.458.039-.66l-1.36-1.75c-.123-.158-.14-.375-.042-.55.308-.551.556-1.148.736-1.774.055-.192.219-.333.417-.358l2.2-.28c.251-.031.444-.248.444-.495v-2.24c0-.247-.193-.464-.439-.493l-2.204-.281c-.198-.025-.362-.166-.417-.358-.18-.626-.428-1.223-.736-1.774-.098-.175-.082-.392.042-.55l1.36-1.75c.157-.202.143-.484-.033-.654l-1.585-1.585c-.175-.182-.458-.196-.66-.039l-1.75 1.36c-.159.123-.376.14-.551.042-.549-.308-1.146-.555-1.774-.736-.192-.055-.333-.219-.358-.417l-.28-2.2c-.031-.252-.248-.445-.495-.445h-2.24c-.247 0-.464.193-.493.439l-.281 2.204c-.025.198-.166.362-.358.418-.628.18-1.225.428-1.774.735-.175.099-.392.081-.551-.041l-1.75-1.36c-.202-.157-.483-.143-.654.033l-1.585 1.586c-.181.176-.195.458-.039.66l1.36 1.75c.123.158.14.375.042.55-.309.551-.556 1.148-.736 1.774-.055.192-.219.333-.417.358l-2.2.28c-.251.03-.444.247-.444.494v2.24c0 .247.193.464.439.493l2.204.281c.198.025.362.166.417.358.18.626.428 1.223.736 1.774.098.175.082.392-.042.55l-1.36 1.75c-.157.202-.143.484.033.654l1.585 1.585c.175.181.456.195.66.039l1.75-1.36c.091-.068.199-.104.308-.104z" />
                </g>
                <g>
                  <path d="m12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z" />
                </g>
              </NavLinkSVG>
            </NavBarBTN>
          ) : null}
        </NavBarItemsRight>
      </NavBar>
      <MsgContainer ref={msgsEl}>
        {msgs
          ? msgs.map((msg, i) => {
              if (msg.type === "message" || type === "dm") {
                return (
                  <Msg
                    className=""
                    key={msg.Id}
                    userType={msg.sender === user ? "user" : "friend"}
                  >
                  <abbr title={msg.sender}>
                    <MSGImage
                      src={
                        membersInfo[msg.sender]
                          ? membersInfo[msg.sender].image_url
                          : ""
                      }
                      alt={msg.sender}
                    />
                    </abbr>
                    <MsgText
                      key={uid()}
                      onClick={() => onMsgClick(msg.text)}
                      userType={msg.sender === user ? "user" : "friend"}
                    >
                      {msg.text}
                    </MsgText>
                    {deleteMsg ? (
                      // <label key={uid()}>
                      //   <input
                      //     type="checkbox"
                      //     name=""
                      //     id=""
                      //     key={uid()}
                      //     onClick={() => onMessageSelect(msg.chatid)}
                      //   />

                      // </label>
                      <label>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onClick={() => onMessageSelect(msg.chatid)}
                          style={{ opacity: 0 }}
                        />

                        {selectedMessages.indexOf(msg.chatid) === -1 ? (
                          <MSGSVG
                            width="164"
                            height="164"
                            viewBox="0 0 164 164"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => console.log(selectedMessages)}
                          >
                            <circle cx="82" cy="82" r="82" fill={"black"} />
                            <path
                              d="M80.7926 120.578C75.8054 125.203 67.7132 125.203 62.7284 120.578L34.7404 94.6254C29.7532 90.003 29.7532 82.4992 34.7404 77.8769C39.7252 73.2523 47.8174 73.2523 52.8046 77.8769L69.4799 93.3376C70.7387 94.5026 72.7822 94.5026 74.0435 93.3376L119.195 51.4684C124.18 46.8439 132.272 46.8439 137.26 51.4684C139.655 53.6892 141 56.7024 141 59.8427C141 62.9831 139.655 65.9962 137.26 68.217L80.7926 120.578Z"
                              fill="black"
                            />
                          </MSGSVG>
                        ) : (
                          <MSGSVG
                            width="164"
                            height="164"
                            viewBox="0 0 164 164"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => console.log(selectedMessages)}
                          >
                            <circle cx="82" cy="82" r="82" fill={"black"} />
                            <path
                              d="M80.7926 120.578C75.8054 125.203 67.7132 125.203 62.7284 120.578L34.7404 94.6254C29.7532 90.003 29.7532 82.4992 34.7404 77.8769C39.7252 73.2523 47.8174 73.2523 52.8046 77.8769L69.4799 93.3376C70.7387 94.5026 72.7822 94.5026 74.0435 93.3376L119.195 51.4684C124.18 46.8439 132.272 46.8439 137.26 51.4684C139.655 53.6892 141 56.7024 141 59.8427C141 62.9831 139.655 65.9962 137.26 68.217L80.7926 120.578Z"
                              fill="white"
                            />
                          </MSGSVG>
                        )}
                      </label>
                    ) : null}
                  </Msg>
                );
              } else if (msg.type === "announcement")
                return (
                  <Announcement className="" key={msg.Id}>
                    {msg.text}
                  </Announcement>
                );
            })
          : null}
        <div style={{ float: "left", clear: "both" }} ref={div}></div>
      </MsgContainer>
      {/* <form action=""> */}
      <SCContainer className="" inputFocus={isInputFocus ? true : false}>
        <SCLabel>
          <SCInput
            type="text"
            onChange={isUserAllow ? setMsg : () => {}}
            value={currentMsg}
            onKeyDown={onkeyPress}
            placeholder={isUserAllow ? "Enter Message" : "You R Not allowed"}
            disabled={isUserAllow ? false : true}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            onMouseEnter={() => setIsInputFocus(true)}
            onMouseLeave={() => setIsInputFocus(false)}
          />
        </SCLabel>
        <SCBtn
          onClick={onClickHandle}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          onMouseEnter={() => setIsInputFocus(true)}
          onMouseLeave={() => setIsInputFocus(false)}
        >
          <NavLinkSVG
            enable-background="new 0 0 24 24"
            height="100%"
            viewBox="0 0 24 24"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z" />
            <path d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z" />
          </NavLinkSVG>
        </SCBtn>
      </SCContainer>
    </div>
  );
};
export default PrivateChat;
