"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface childrenSession {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: childrenSession) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
