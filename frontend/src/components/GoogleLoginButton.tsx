"use client";

import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      onSuccess={(cred) => {
        console.log(123);
        console.log(cred);
      }}
    />
  );
};

export default GoogleLoginButton;
