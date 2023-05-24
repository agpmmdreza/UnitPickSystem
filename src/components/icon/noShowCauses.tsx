// hospital-linear.svg
import {ReactComponent as NoShowCausesDuotoneSVG} from "assets/icons/duotone/warning-duotone.svg";
import classes from "./styles.module.scss";

function NoShowCausesDuotone(props: { [key: string]: any }) {
  return (
    <NoShowCausesDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { NoShowCausesDuotone };
