import React, { useState, useEffect } from "react";
import { InputPrimary, BTNPrimary, LinkPrimary } from "../Styles/Form.styles";
const SendOTP = ({ setIsVerified, setUsername, username }) => {
  const [isOTPSend, setIsOTPSend] = useState(false);

  const [userTypedOTP, setUserTypedOTP] = useState("");
  const [otp, setOtp] = useState("");
  const sendOTP = () => {
    fetch(`http://localhost:5005/forget/password?username=${username}`, {})
      .then((response) => response.json())
      .then(({ otp }) => setOtp(otp));
    setIsOTPSend(true);
  };
  const checkOTP = () => {
    if (otp === userTypedOTP) {
      setIsVerified(true);
      alert("correct OTP");
      console.log(12);
    } else {
      alert("Wrong OTP,New OTP Sent");
      sendOTP();
    }
  };
  return (
    <>
      {!isOTPSend ? (
        <>
          <InputPrimary
            type="text"
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <BTNPrimary onClick={sendOTP}>Send OTP</BTNPrimary>
        </>
      ) : (
        <>
          <InputPrimary
            type="text"
            placeholder="OTP"
            value={userTypedOTP}
            onChange={({ target }) => setUserTypedOTP(target.value)}
          />
          <BTNPrimary onClick={checkOTP}>Verify</BTNPrimary>
          <LinkPrimary onClick={sendOTP}>Resend</LinkPrimary>
        </>
      )}
    </>
  );
};

export default SendOTP;
