import {ReactComponent as ScreenShot} from "assets/icons/bulk/screenshot-icon.svg";
import classes from "./styles.module.scss";

function ScreenShotLinear(props: { [key: string]: any }) {
  return <ScreenShot data-variant="bulk" className={classes.icon} {...props} />;
}

export { ScreenShotLinear };
