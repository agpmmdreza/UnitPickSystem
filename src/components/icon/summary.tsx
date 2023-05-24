import {ReactComponent as SummarySVG} from "assets/icons/duotone/summary.svg";
import classes from "./styles.module.scss";

function SummaryDuotone(props: { [key: string]: any }) {
  return <SummarySVG className={classes.icon} data-variant="bold" {...props} />;
}

export { SummaryDuotone };
