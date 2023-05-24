import {ReactComponent as PendingIconSVG} from "assets/icons/bulk/pending-icon.svg";
import classes from "./styles.module.scss";

function PendingIcon(props: { [key: string]: any }) {
  return (
    <PendingIconSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { PendingIcon };
