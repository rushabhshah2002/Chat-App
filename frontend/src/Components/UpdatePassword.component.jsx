import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
const UpdatePassword = ({ isVerified, username }) => {
||||||| 2b5beff
const UpdatePassword = ({ isVerified,username }) => {
=======
const UpdatePassword = ({ isVerified,username,setUser }) => {
>>>>>>> 83718f4ac71c2f4a2f79b58d5891c288dc46aa44
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
<<<<<<< HEAD
        .then((response) => response.json())
        .then(() => history.push("/"));
||||||| 2b5beff
      .then((response) => response.json()).then(()=>history.push("/"))
  
  
  };
      
=======
      .then((response) => response.json()).then(({user})=>{
        if(user.err){
          alert(user.err);
         return;
        }
        history.push("/")
        setUser(user)
      })
  
  
  }
  else {
    alert("password does not match")
  }
      
>>>>>>> 83718f4ac71c2f4a2f79b58d5891c288dc46aa44
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
