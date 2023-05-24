import {ReactComponent as ReportDuotoneSVG} from "assets/icons/duotone/report.svg";
import classes from "./styles.module.scss";

function ReportDuotone(props: { [key: string]: any }) {
  return (
    <ReportDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { ReportDuotone };
