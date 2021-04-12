import React, { useState, useEffect } from "react";
import UpdatePassword from "./UpdatePassword.component";
import SendOTP from "./SendOTP.component";

import {
  FormHeading,
  Container,
  BTNPrimary,
  LinkPrimary,
} from "../Styles/Form.styles";

const ForgetPassword = ({ setUser }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [username, setUsername] = useState("");
  return (
    <Container className="">
      <FormHeading>Forget Password</FormHeading>
      {!isVerified ? (
        <SendOTP
          setIsVerified={setIsVerified}
          username={username}
          setUsername={setUsername}
        />
      ) : (
        <UpdatePassword
          isVerified={isVerified}
          username={username}
          setUser={setUser}
        />
      )}
      <LinkPrimary to="/">HomePage</LinkPrimary>
    </Container>
  );
};

export default ForgetPassword;
