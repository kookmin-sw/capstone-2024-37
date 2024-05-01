"use client";

import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <button onClick={() => login()}>
      <Image src="/google_si.png" width={192} height={32} alt="" />
    </button>
  );
};

export default GoogleLoginButton;
