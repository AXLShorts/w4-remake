import React from "react";
import { Button } from "./ui/button";

type Props = {};

const GoogleAuthButton = (props: Props) => {
  const handleClick = () => {
    window.open("http://127.0.0.1:4000/auth/google", "_self");
  };
  return <Button onClick={handleClick}>Sign with Google</Button>;
};

export default GoogleAuthButton;
