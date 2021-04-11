import React, { useState, useEffect } from "react";
import ImageCrop from "./ImageCrop.component.jsx";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
let socket;
const UserInfoForm = ({ user }) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    socket = io("127.0.0.1:3003", { transports: ["websocket"] });
  }, []);
  const handleSubmit = (dataURI) => {
 
    setUserInfo({ ...userInfo, dataURI });
  };
  const onBTNClick = () => {
    socket.emit("user-info", { ...userInfo, username: user });
    history.push("/");
  };
  return (
    <div className="">
      <textarea
        name="Bio"
        id=""
        cols="30"
        rows="10"
        placeholder="Enter your Bio"
        value={userInfo.bio}
        onChange={({ target }) =>
          setUserInfo({ ...userInfo, bio: target.value })
        }
      ></textarea>
      <label>
        DOB:{" "}
        <input
          type="date"
          name=""
          id=""
          value={userInfo.dob}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, dob: target.value })
          }
        />
        ;
      </label>
      {userInfo.dataURI ? (
        <>
          <img src={userInfo.dataURI} alt="Profile " />
          <button onClick={() => setUserInfo({ ...userInfo, dataURI: "" })}>
            Change Image
          </button>
        </>
      ) : (
        <ImageCrop handleSubmit={handleSubmit} />
      )}

      <button onClick={onBTNClick}>Submit</button>
    </div>
  );
};

export default UserInfoForm;
