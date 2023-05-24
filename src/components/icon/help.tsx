import {ReactComponent as HelpDuotoneSVG} from "assets/icons/duotone/help.svg";
import classes from "./styles.module.scss";

function HelpDuotone(props: { [key: string]: any }) {
  return (
    <HelpDuotoneSVG className={classes.icon} data-variant="bulk" {...props} />
  );
}

export { HelpDuotone };
