import {toast} from "react-toastify";
import classes from "./styles.module.scss";
import {CanceledLinear, SuccessLinear, WarningLinear} from "components/icon";

const success = (msg: string) => {
  return toast.success(msg, {
    icon: () => (
      <div className={classes.toast}>
        <SuccessLinear />
      </div>
    ),
  });
};

const error = (msg: string) => {
  return toast.error(msg, {
    icon: () => (
      <div className={classes.toast}>
        <CanceledLinear />
      </div>
    ),
  });
};

const warning = (msg: string) => {
  return toast.warning(msg, {
    icon: () => (
      <div className={classes.toast}>
        <WarningLinear />
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
