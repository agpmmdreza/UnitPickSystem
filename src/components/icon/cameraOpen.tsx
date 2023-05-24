import {ReactComponent as CameraOpenLinearSVG} from "assets/icons/linear/camera-open-icon.svg";
import classes from "./styles.module.scss";

function CameraOpenLinear(props: { [key: string]: any }) {
  return (
    <CameraOpenLinearSVG
      data-variant="linear"
      className={classes.icon}
      {...props}
    />
  );
}

export { CameraOpenLinear };
