"use client";

import React from "react";
import "./styles.css";

interface ButtonProps {
  type: "submit" | "button";
  children: React.ReactNode;
}

const Button = ({ type, children }: ButtonProps) => {
  return (
    <button type={type} className="login-button">
      {children}
    </button>
  );
};

export default Button;
