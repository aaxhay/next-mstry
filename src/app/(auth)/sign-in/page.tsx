"use client";
import { signIn } from "next-auth/react";

const page = () => {
  return <button onClick={() => signIn()}>Sign In</button>
};

export default page;
