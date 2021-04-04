import React, { useState, useEffect } from "react";

const SendOTP = ({ setIsVerified }) => {
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [username, setUsername] = useState("");
  const [userTypedOTP, setUserTypedOTP] = useState("");
  const [otp, setOtp] = useState("");
  const sendOTP = () => {
    fetch(`http://localhost:5005/forget/password?username=${username}`)
      .then((response) => response.json())
      .then(({ otp }) => setOtp(otp));
    setIsOTPSend(true);
  };
  const checkOTP = () => {
    if (otp === userTypedOTP) {
      setIsVerified(true);
      alert("Correct otp");
    } else {
      alert("Wrong OTP,New OTP Sent");
      sendOTP();
    }
  };
  return (
    <div className="">
      {!isOTPSend ? (
        <>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="OTP"
            value={userTypedOTP}
            onChange={({ target }) => setUserTypedOTP(target.value)}
          />
          <button onClick={checkOTP}>Verify</button>
          <button onClick={sendOTP}>Resend</button>
        </>
      )}
    </div>
  );
};

export default SendOTP;
