import {ReactComponent as ErrorIconSVG} from "assets/icons/bulk/error-icon.svg";
import classes from "./styles.module.scss";

function ErrorIcon(props: { [key: string]: any }) {
  return (
    <ErrorIconSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { ErrorIcon };
