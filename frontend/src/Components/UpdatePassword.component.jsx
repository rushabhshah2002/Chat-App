import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const UpdatePassword = ({ isVerified,username,setUser }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm: "",
  });
  const history=useHistory();
  const passwordChange = () => {
    
    if (isVerified && passwords.password === passwords.confirm) {
      fetch(`http://localhost:5005/forget/password`,{
        method: "POST",
        headers: {
          'Content-Type':'application/json'

        },
        body: JSON.stringify({
          password:passwords.password,
          username:username
          
        })
      })
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
      
    }

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
