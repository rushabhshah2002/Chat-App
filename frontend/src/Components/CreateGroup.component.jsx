import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  CreateGroupDetailsContainer,
  CreateGroupDetails,
  CGExit,
  CGHeading,
  CGInputs,
  NavLinkSVG,
  CGFriendContainer,
  CGFriendImage,
  CGFriendInfo,
  CGBTN,
  CGFriendLabel,
  CGSVG,
  CGSVGCircle,
} from "../Styles/ChatDir.styles";
let socket;
const CreateGroup = ({ setIsCreate, isCreate, user }) => {
  const [friendSearch, setFriendSearch] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [num, setNum] = useState(0);
  useEffect(() => {
    socket = io("127.0.0.1:3003", { transports: ["websocket"] });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5005/allUsers")
      .then((response) => response.json())
      .then(({ users }) => {
        setFriends(users);
      });
  }, []);
  const createGroup = () => {
    if (isCreate && groupName && selectedFriends.length > 0) {
      const data = {
        members: selectedFriends,
        username: user.username,
        group_name: groupName,
      };
      socket.emit("create-group", data);
      setSelectedFriends([]);
      setIsCreate(false);
      setGroupName("");
    } else {
      alert("Sumaar");
    }
  };

  const onFriendSelected = (friend) => {
    let arr = selectedFriends;
    if (arr.indexOf(friend) === -1) {
      arr.push(friend);
      setNum(num + 1);
    } else {
      arr.splice(arr.indexOf(friend), 1);
      setNum(num - 1);
    }

    setSelectedFriends(arr);
  };
  return (
    <CreateGroupDetailsContainer className="">
      <CreateGroupDetails className="">
        <CGExit onClick={() => setIsCreate(!isCreate)}>
          <NavLinkSVG
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
          </NavLinkSVG>
        </CGExit>
        <CGHeading>Create Group</CGHeading>
        <CGInputs
          type="text"
          name="createGroup"
          id=""
          list="friends"
          placeholder="Enter Group Name"
          onChange={({ target }) => setGroupName(target.value)}
          value={groupName}
        />
        <CGInputs
          type="text"
          value={friendSearch}
          onChange={({ target }) => setFriendSearch(target.value)}
          placeholder={"Search Friends"}
        />
        <CGFriendContainer className="">
          {friends
            ? friends
                .filter(
                  (friend, i) =>
                    // Give suggestion on basis username search and does not show user itself
                    friend.username.toLowerCase().includes(friendSearch) &&
                    friend.username !== user.username
                )
                .map((friend) => (
                  <CGFriendLabel>
                    <CGFriendInfo>
                      <CGFriendImage src={friend.image_url} alt="" />
                      {friend.username}
                    </CGFriendInfo>

                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onClick={() => onFriendSelected(friend.username)}
                      style={{ opacity: 0 }}
                    />
                    {selectedFriends.indexOf(friend.username) === -1 ? (
                      <CGSVG
                        width="164"
                        height="164"
                        viewBox="0 0 164 164"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => console.log(selectedFriends)}
                      >
                        <circle cx="82" cy="82" r="82" fill={"white"} />
                        <path
                          d="M80.7926 120.578C75.8054 125.203 67.7132 125.203 62.7284 120.578L34.7404 94.6254C29.7532 90.003 29.7532 82.4992 34.7404 77.8769C39.7252 73.2523 47.8174 73.2523 52.8046 77.8769L69.4799 93.3376C70.7387 94.5026 72.7822 94.5026 74.0435 93.3376L119.195 51.4684C124.18 46.8439 132.272 46.8439 137.26 51.4684C139.655 53.6892 141 56.7024 141 59.8427C141 62.9831 139.655 65.9962 137.26 68.217L80.7926 120.578Z"
                          fill="white"
                        />
                      </CGSVG>
                    ) : (
                      <CGSVG
                        width="164"
                        height="164"
                        viewBox="0 0 164 164"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => console.log(selectedFriends)}
                      >
                        <circle cx="82" cy="82" r="82" fill={"black"} />
                        <path
                          d="M80.7926 120.578C75.8054 125.203 67.7132 125.203 62.7284 120.578L34.7404 94.6254C29.7532 90.003 29.7532 82.4992 34.7404 77.8769C39.7252 73.2523 47.8174 73.2523 52.8046 77.8769L69.4799 93.3376C70.7387 94.5026 72.7822 94.5026 74.0435 93.3376L119.195 51.4684C124.18 46.8439 132.272 46.8439 137.26 51.4684C139.655 53.6892 141 56.7024 141 59.8427C141 62.9831 139.655 65.9962 137.26 68.217L80.7926 120.578Z"
                          fill="white"
                        />
                      </CGSVG>
                    )}
                    <p style={{ display: "none" }}>{num}</p>
                  </CGFriendLabel>
                ))
            : null}
        </CGFriendContainer>
        <CGBTN onClick={createGroup}>Create</CGBTN>
      </CreateGroupDetails>
    </CreateGroupDetailsContainer>
  );
};

export default CreateGroup;
