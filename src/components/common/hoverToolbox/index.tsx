import { PropsWithChildren } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export interface IHoverToolbox extends PropsWithChildren<any> {
  text: string;
  pos?: "default" | "right";
}

const HoverToolbox = ({ text, children, pos }: IHoverToolbox) => {
  return (
    <div className={clsx(classes.box)}>
      {children}
      <div className={clsx(classes.label, pos === "right" && classes.right)}>
        <div
          className={clsx(classes.icon, pos === "right" && classes.rightIcon)}
        ></div>
        <div>{text}</div>
      </div>
    </div>
  );
};

HoverToolbox.defaultProps = {
  pos: "default",
};

export default HoverToolbox;
