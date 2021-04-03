import React, { useState } from "react";
import sendEmail from "../../../restServer/utils/sendEmail.utils";
import ChangePassword from "./ChangePassword.component";
const ForgetPassword = () => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="">
      {!isVerified ? (
        <sendEmail setIsVerified={setIsVerified} />
      ) : (
        <ChangePassword isVerified={isVerified} />
      )}
    </div>
  );
};

export default ForgetPassword;
