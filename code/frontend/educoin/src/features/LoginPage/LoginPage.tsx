import React from "react";
import SingUpBox from "./components/SignUpBox";

export default function SignUpPageStudent() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SingUpBox />
    </div>
  );
}
