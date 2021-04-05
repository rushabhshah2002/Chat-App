import React, { useState,useEffect } from "react";
import UpdatePassword from "./UpdatePassword.component";
import SendOTP from "./SendOTP.component"
const ForgetPassword = ({setUser}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [username,setUsername]=useState("")

  return (
    <div className="">
      {!isVerified ? (
        <SendOTP setIsVerified={setIsVerified}  username={username}  setUsername={setUsername} />
      ) : (
       
        <UpdatePassword isVerified={isVerified} username={username} setUser={setUser}/>
      )}
    </div>
  );
};

export default ForgetPassword;