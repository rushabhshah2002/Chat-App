import React, { useState, useEffect } from "react";
import UpdatePassword from "./UpdatePassword.component";
<<<<<<< HEAD
import SendOTP from "./SendOTP.component";
const ForgetPassword = () => {
||||||| 2b5beff
import SendOTP from "./SendOTP.component"
const ForgetPassword = () => {
=======
import SendOTP from "./SendOTP.component"
const ForgetPassword = ({setUser}) => {
>>>>>>> 83718f4ac71c2f4a2f79b58d5891c288dc46aa44
  const [isVerified, setIsVerified] = useState(false);
<<<<<<< HEAD
  const [username, setUsername] = useState("");
||||||| 2b5beff
  const [username,setUsername]=useState("")
=======
  const [username,setUsername]=useState("")

>>>>>>> 83718f4ac71c2f4a2f79b58d5891c288dc46aa44
  return (
    <div className="">
      {!isVerified ? (
        <SendOTP
          setIsVerified={setIsVerified}
          username={username}
          setUsername={setUsername}
        />
      ) : (
<<<<<<< HEAD
        <UpdatePassword isVerified={isVerified} username={username} />
||||||| 2b5beff
       
        <UpdatePassword isVerified={isVerified} username={username} />
=======
       
        <UpdatePassword isVerified={isVerified} username={username} setUser={setUser}/>
>>>>>>> 83718f4ac71c2f4a2f79b58d5891c288dc46aa44
      )}
    </div>
  );
};

export default ForgetPassword;
