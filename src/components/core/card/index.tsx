import React, {HTMLAttributes, PropsWithChildren} from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";

interface ICardDefaultProps
  extends PropsWithChildren<any>,
    HTMLAttributes<any> {}

interface ICardVariant {
  variant?: "outlined" | "contained";
}

interface ICardColorProps {
  color?: "none" | "success" | "error" | "warning";
}

// base card component
function Card({
  className,
  color,
  children,
  variant,
  ...rest
}: ICardDefaultProps & (ICardColorProps | ICardVariant)) {
  // render component
  return (
    <div
      className={clsx([classes.main, className])}
      data-variant={variant}
      data-color={color}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  variant: "contained",
  color: "none",
};

export default Card;
