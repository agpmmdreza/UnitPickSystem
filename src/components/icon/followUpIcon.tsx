import {ReactComponent as FollowUpIconSVG} from "assets/icons/bulk/followUp-icon.svg";
import classes from "./styles.module.scss";

function FollowUpIcon(props: { [key: string]: any }) {
  return (
    <FollowUpIconSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { FollowUpIcon };
