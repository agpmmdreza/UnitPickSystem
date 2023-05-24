import Button, {TButtonProps} from "../button";
import React from "react";

const SecondaryButton: React.FC<TButtonProps> = ({ children, ...rest }) => {
  return (
    <Button {...rest} variant={"outlined"} color={"primary"}>
      {children}
    </Button>
  );
};

export default SecondaryButton;
