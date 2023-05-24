import {ReactComponent as AppointmentDuotoneSVG} from "assets/icons/duotone/appointment.svg";
import classes from "./styles.module.scss";

function AppointmentDuotone(props: { [key: string]: any }) {
  return (
    <AppointmentDuotoneSVG
      className={classes.icon}
      data-variant="bulk"
      {...props}
    />
  );
}

export { AppointmentDuotone };
