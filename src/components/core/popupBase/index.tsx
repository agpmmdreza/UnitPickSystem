import React, { useEffect, useRef } from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";

export type TPopupColor = "info" | "success" | "warning" | "error";

interface IPopupProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
  onClose: () => void;
  className?: string;
  color: TPopupColor;
  title: string;
  text: string;
}

// function to return proper element based on type of alert

// popup component for showing popup with message inside
const PopupBase = ({
  open,
  onClose,
  className,
  color,
  title,
  text,
  ...rest
}: IPopupProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // function for closing popup on click outside
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };
  // attach event handlers
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return null;
  // render component
  return (
    <div className={classes.backdrop}>
      <div
        className={clsx([classes.box, "d-flex", className])}
        data-testid="test-alert-box"
        data-color={color}
        ref={ref}
        {...rest}
      >
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            {color === "info" && <span className={classes.infoNews}>NEWS</span>}

            <span className={classes.title}>{title}</span>
            <span className={classes.text}>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupBase.defaultProps = {
  open: false,
  onClose: () => {},
  color: "info",
};

export default PopupBase;
