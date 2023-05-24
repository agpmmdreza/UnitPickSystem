import {Dispatch, ReactNode, SetStateAction} from "react";
import Modal from "../../core/modal";
import Button from "../../core/button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import {useUnblock} from "../../../hooks/useBlock";

export interface IAlertProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  dismissible?: boolean;
  onClose?: () => any;
  onCancel?: () => any;
  customButtons?: ReactNode;
  title: string;
  text: string;
  onApprove?: () => any;
  submit?: boolean;
  noCancel?: boolean;
  approveText?: string;
  /**
   * modal max-width in px
   */
  modalMaxWidth?: number;
}

const Alert = ({
  open,
  setOpen,
  dismissible,
  onClose,
  title,
  text,
  customButtons,
  onCancel,
  onApprove,
  submit,
  noCancel,
  approveText,
  modalMaxWidth = 600,
}: IAlertProps) => {
  const unblock = useUnblock();

  return (
    <Modal
      open={open}
      backdrop={true}
      draggable={false}
      onClose={() => {
        if (dismissible) {
          if (onClose) {
            onClose();
          }
          setOpen(false);
        }
      }}
      maxWidth={modalMaxWidth}
    >
      <div className={clsx(classes.alert)}>
        <h6 className={clsx(classes.alert__title)}>{title}</h6>
        <p className={clsx(classes.alert__text)}>{text}</p>
        <div className={clsx(classes.alert__btns)}>
          {!customButtons && (
            <>
              {!noCancel && (
                <Button
                  variant={"outlined"}
                  color={"secondary"}
                  onClick={() => {
                    if (onCancel) {
                      onCancel();
                    }
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                type={submit ? "submit" : undefined}
                onClick={() => {
                  setOpen(false);
                  if (onApprove) {
                    unblock();
                    setTimeout(() => onApprove(), 300);
                  }
                }}
              >
                {approveText || "Approve"}
              </Button>
            </>
          )}
          {!!customButtons && customButtons}
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
