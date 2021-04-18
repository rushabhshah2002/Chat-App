import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputPrimary, BTNPrimary } from "../Styles/Form.styles";
const UpdatePassword = ({ isVerified, username, setUser }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
  });
  const history = useHistory();
  const passwordChange = () => {
    if (isVerified && passwords.password === passwords.confirm) {
      fetch(`http://localhost:5005/forget/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwords.password,
          username: username,
        }),
      })
        .then((response) => response.json())
        .then(({ user,err }) => {
          if (err) {
            alert(err.sqlMessage);
            return;
          }
          history.push("/");
          setUser(user[0]);
          console.log(user)
        });
    } else {
      alert("password does not match");
    }
  };

  return (
    <>
      <InputPrimary
        type="password"
        name="password"
        id=""
        placeholder="New Password"
        value={passwords.password}
        onChange={({ target }) =>
          setPasswords({ ...passwords, password: target.value })
        }
      />
      <InputPrimary
        type="password"
        name="confirm-password"
        id=""
        placeholder="Confirm Password"
        value={passwords.confirm}
        onChange={({ target }) =>
          setPasswords({ ...passwords, confirm: target.value })
        }
      />
      <BTNPrimary onClick={passwordChange}>Update</BTNPrimary>
    </>
  );
};

export default UpdatePassword;
