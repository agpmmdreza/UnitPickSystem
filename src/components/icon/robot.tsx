import {ReactComponent as RobotSVG} from "assets/icons/bulk/robot-detail.svg";
import classes from "./styles.module.scss";

function RobotIcon(props: { [key: string]: any }) {
  return <RobotSVG data-variant="bulk" className={classes.icon} {...props} />;
}

export { RobotIcon };
