import {
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import classes from "./styles.module.scss";

const success = (msg: string) => {
  return toast.success(msg, {
    icon: () => (
      <div className={classes.toast}>
        <CheckIcon />
      </div>
    ),
  });
};

const error = (msg: string) => {
  return toast.error(msg, {
    icon: () => (
      <div className={classes.toast}>
        <XMarkIcon />
      </div>
    ),
  });
};

const warning = (msg: string) => {
  return toast.warning(msg, {
    icon: () => (
      <div className={classes.toast}>
        <ExclamationCircleIcon />
      </div>
    ),
  });
};

const info = (msg: string) => {
  return toast.info(msg, {
    icon: false,
  });
};

export const notify = { success, error, warning, info };
