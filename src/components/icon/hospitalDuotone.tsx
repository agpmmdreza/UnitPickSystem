// hospital-linear.svg
import {ReactComponent as HospitalDuotoneSVG} from "assets/icons/duotone/hospital.svg";
import classes from "./styles.module.scss";

function HospitalDuotone(props: { [key: string]: any }) {
  return (
    <HospitalDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { HospitalDuotone };
