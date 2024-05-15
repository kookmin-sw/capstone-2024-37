"use client";

import { API_SERVER } from "@/config";
import useUser from "@/hooks/useUser";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const GoogleLoginButton = () => {
  const { user, setUser } = useUser();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const response = await sendToken(tokenResponse.access_token);
      if (response) {
        await getUserInfo(response);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      alert("로그인 실패");
    },
  });

  async function onSignUp(tokenRes) {
    try {
      const res = await fetch(`${API_SERVER}/auth/sign-up`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "google",
          token: tokenRes,
        }),
      });
      const response = await res.json();
      if (response.message === "Success") {
        return await sendToken(tokenRes);
      } else if (response.detail === "User Exist") {
        alert("이미 회원가입된 아이디입니다.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
      console.log(response);
    } catch (e) {
      console.error(e);
      alert("회원가입 도중 오류가 발생했습니다.");
    }
  }

  async function sendToken(tokenRes) {
    try {
      const res = await fetch(`${API_SERVER}/auth/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "google",
          token: tokenRes,
        }),
      });
      const response = await res.json();
      if (response.message === "User not found") {
        console.log(response);
        return await onSignUp(tokenRes);
      } else {
        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getUserInfo(userToken) {
    try {
      const res = await fetch(`${API_SERVER}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-type": "application/json",
        },
      });
      const userInfo = await res.json();
      setUser({
        token: userToken,
        email: userInfo.email,
        clientID: userInfo.client_id,
        company: userInfo.company_name,
      });
      window.location.href = "/";
      console.log("토큰", userToken);
      console.log("로그인 성공");
    } catch (e) {
      console.error("로그인 실패");
      alert("로그인 실패");
    }
  }

  return (
    <button onClick={() => login()}>
      <Image src="/google_si.png" width={192} height={32} alt="" />
    </button>
  );
};

export default GoogleLoginButton;
