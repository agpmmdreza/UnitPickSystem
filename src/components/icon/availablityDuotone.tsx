import {ReactComponent as AvailabilityDoutoneSVG} from "assets/icons/duotone/availability.svg";
import classes from "./styles.module.scss";

function AvailabilityDoutone(props: { [key: string]: any }) {
  return (
    <AvailabilityDoutoneSVG
      data-variant="bold"
      {...props}
      className={classes.icon}
    />
  );
}

export { AvailabilityDoutone };
