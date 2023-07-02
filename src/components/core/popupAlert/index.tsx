import React, { useEffect, useRef } from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import Button from "components/core/button";

interface IPopupProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
  onClose: () => void;
  onApprove?: () => void;
  title?: string;
  description?: string;
  className?: string;

  [x: string]: any;
}

// alert component for approval and disapproval of message
const Popup = ({
  open,
  onClose,
  onApprove,
  title,
  description,
  className,
  ...rest
}: IPopupProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // closing alert on click outside
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };
  // attach click handlers
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = () => {
    if (!!onApprove) onApprove();
    onClose();
  };
  // render component
  return (
    <>
      {open && (
        <div className={classes.backdrop}>
          <div
            className={clsx([classes.box, "d-flex flex-column ", className])}
            data-testid="test-alert-box"
            ref={ref}
            {...rest}
          >
            <div className="d-flex ">
              <div
                className={clsx(["d-flex flex-column", classes.confirmText])}
              >
                <span className="title">Approve the Operation</span>
                <span className="text">{description}</span>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              {" "}
              <Button
                color="primary"
                variant="contained"
                className={clsx("m-2")}
                onClick={handleApprove}
              >
                <div>Approve</div>
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                className={clsx("m-2")}
                onClick={() => {
                  onClose();
                }}
              >
                <div>Cancel</div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Popup.defaultProps = {
  open: false,
  onClose: () => {},
  onApprove: () => {},
};

export default Popup;
