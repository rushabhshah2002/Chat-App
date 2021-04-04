import React, { useState, useEffect } from "react";
const UpdatePassword = ({ isVerified, username }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
  });
  const passwordChange = () => {
    if (isVerified && passwords.password === passwords.confirm) {
      fetch("http://localhost:5005/forget/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });
    }
  };

  return (
    <div className="">
      <input
        type="password"
        name="password"
        id=""
        placeholder="new password"
        value={passwords.password}
        onChange={({ target }) =>
          setPasswords({ ...passwords, password: target.value })
        }
      />
      <input
        type="password"
        name="confirm-password"
        id=""
        placeholder="confirm password"
        value={passwords.confirm}
        onChange={({ target }) =>
          setPasswords({ ...passwords, confirm: target.value })
        }
      />
      <button onClick={passwordChange}>Update Password</button>
    </div>
  );
};

export default UpdatePassword;
