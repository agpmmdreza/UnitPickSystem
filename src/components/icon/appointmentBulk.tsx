import {ReactComponent as AppointmentBulkSVG} from "assets/icons/bulk/appointment-detail.svg";
import classes from "./styles.module.scss";

function AppointmentBulk(props: { [key: string]: any }) {
  return (
    <AppointmentBulkSVG
      data-variant="bulk"
      className={classes.icon}
      {...props}
    />
  );
}

export { AppointmentBulk };
