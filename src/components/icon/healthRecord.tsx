import {ReactComponent as HealthRecordDuotoneSVG} from "assets/icons/duotone/health-record.svg";
import classes from "./styles.module.scss";

function HealthRecordDuotone(props: { [key: string]: any }) {
  return (
    <HealthRecordDuotoneSVG
      className={classes.icon}
      data-variant="bulk"
      {...props}
    />
  );
}

export { HealthRecordDuotone };
