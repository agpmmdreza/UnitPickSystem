import {ReactComponent as MonitorDuotoneSVG} from "assets/icons/duotone/monitor.svg";
import classes from "./styles.module.scss";

function MonitorDuotone(props: { [key: string]: any }) {
  return (
    <MonitorDuotoneSVG
      className={classes.icon}
      data-variant="linear"
      {...props}
    />
  );
}

export { MonitorDuotone };
