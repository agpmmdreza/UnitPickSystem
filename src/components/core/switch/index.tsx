import React from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";

export interface ISwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  className?: string;
  disabled?: boolean;
}

// checkbox component with shape of switch
const Switch = ({ checked, onChange, className, disabled }: ISwitchProps) => {
  const handleToggleSwitch = () => {
    onChange(!checked);
  };
  // render component
  return (
    <div
      onClick={!!disabled ? undefined : handleToggleSwitch}
      className={clsx([className, classes.track])}
      data-status={checked ? "on" : "off"}
      data-testid="test-switch"
      data-disabled={!!disabled}
    >
      <div data-status={checked ? "on" : "off"} className={classes.thumb}></div>
    </div>
  );
};

Switch.defaultProps = {
  onChange: () => {},
};

export default Switch;
