import Button from "../button";
import Modal from "../modal";
import classes from "./styles.module.scss";

export interface INotificationAlertProps {
  open: boolean;
  /** Title for the modal header (optional) */
  title?: string;
  onClose?: () => void;
  /**
   * by default cancel button behave like onClose function, but if you pass this props
   * they (cancel and close buttons) will behave severalty.
   * @returns
   */
  onCancel?: () => void;
  contnet?: string;
  onApprove?: () => void;
  /**
   * modal max-width in px
   */
  modalMaxWidth?: number;
  approveTitle?: string;
  noCancel?: boolean;
}

const NotificationAlert = ({
  contnet,
  onApprove,
  onCancel,
  noCancel,
  approveTitle,
  modalMaxWidth = 600,
  ...props
}: INotificationAlertProps) => {
  const handleApprove = () => {
    if (!!onApprove) onApprove();
    if (props.onClose) props.onClose();
  };
  return (
    <div>
      <Modal {...props} maxWidth={modalMaxWidth}>
        <p className={classes.alertText}>{contnet}</p>
        <div className="d-flex justify-content-end">
          {!noCancel && (
            <Button
              variant="outlined"
              color="secondary"
              className="me-2"
              onClick={!!onCancel ? onCancel : props.onClose}
            >
              لغو
            </Button>
          )}
          <Button color="secondary" onClick={handleApprove}>
            {approveTitle || "تایید"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationAlert;
