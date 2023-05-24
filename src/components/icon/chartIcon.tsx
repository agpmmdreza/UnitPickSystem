import {ReactComponent as ChartIconSVG} from "assets/icons/bulk/chart-icon.svg";
import classes from "./styles.module.scss";

function ChartIcon(props: { [key: string]: any }) {
  return (
    <ChartIconSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { ChartIcon };
