import React, { useState } from "react";
import SendOTP from "./SendOTP.component";
import ChangePassword from "./ChangePassword.component";
const ForgetPassword = () => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="">
      {!isVerified ? (
        <SendOTP setIsVerified={setIsVerified} />
      ) : (
        <ChangePassword isVerified={isVerified} />
      )}
    </div>
  );
};

export default ForgetPassword;
