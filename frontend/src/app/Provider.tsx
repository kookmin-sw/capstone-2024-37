"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <GoogleOAuthProvider clientId="231276786841-ke3ea94ulqh9aoqfb6p4erm4jaq4iiso.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
