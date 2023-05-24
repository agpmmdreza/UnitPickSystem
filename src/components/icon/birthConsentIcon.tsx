import {ReactComponent as BirthConsentSVG} from "assets/icons/bulk/birth-consent.svg";
import classes from "./styles.module.scss";

function BirthConsentIcon(props: { [key: string]: any }) {
  return (
    <BirthConsentSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { BirthConsentIcon };
