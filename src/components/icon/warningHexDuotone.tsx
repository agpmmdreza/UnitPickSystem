// hospital-linear.svg
import {ReactComponent as WarningHexDuotoneSVG} from "assets/icons/duotone/warning.svg";
import classes from "./styles.module.scss";

function WarningHexDuotone(props: { [key: string]: any }) {
  return (
    <WarningHexDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { WarningHexDuotone };
