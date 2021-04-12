import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProfilePage = ({user}) => {
  const [userInfo, setUserInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5005/user/info?username=${user}`)
      .then((response) => response.json())
      .then((user) => setUserInfo(user));
      
  }, []);
  return (
    <div className="">
      <h1>{userInfo.username}</h1>
      <img src={userInfo.image_url} alt="user DP" />
      <p>{userInfo.dob}</p>
      <p>{userInfo.description}</p>
      <input
        type={showPassword ? "text" : "password"}
        name=""
        id=""
        value={userInfo.password}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {!showPassword ? "👁" : "🙈"}
      </button>
      <Link to="/forget/password">Change Password</Link>
    </div>
  );
};

export default ProfilePage;
