import {ReactComponent as TickConsentIconSVG} from "assets/icons/bulk/tick-consent.svg";
import classes from "./styles.module.scss";

function TickConsentIcon(props: { [key: string]: any }) {
  return (
    <TickConsentIconSVG
      data-variant="bulk"
      className={classes.icon}
      {...props}
    />
  );
}

export { TickConsentIcon };
