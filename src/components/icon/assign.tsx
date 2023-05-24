import {ReactComponent as AssignDuotoneSVG} from "assets/icons/duotone/assign.svg";
import classes from "./styles.module.scss";

function AssignDuotone(props: { [key: string]: any }) {
  return (
    <AssignDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { AssignDuotone };
