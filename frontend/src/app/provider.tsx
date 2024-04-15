"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return (
    <GoogleOAuthProvider clientId="231276786841-ke3ea94ulqh9aoqfb6p4erm4jaq4iiso.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
