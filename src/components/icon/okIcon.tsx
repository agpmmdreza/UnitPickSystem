import {ReactComponent as OkIconSVG} from "assets/icons/bulk/ok-icon.svg";
import classes from "./styles.module.scss";

function OkIcon(props: { [key: string]: any }) {
  return <OkIconSVG data-variant="bulk" className={classes.icon} {...props} />;
}

export { OkIcon };
