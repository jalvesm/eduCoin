import React from "react";
import SignUpBoxStudent from "./components/SignUpBoxStudent";

export default function SignUpPageStudent() {
  return (
    <div
      style={{
        backgroundColor: "#282c34",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignUpBoxStudent />
    </div>
  );
}
