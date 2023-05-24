import {ReactComponent as ReferralIconSVG} from "assets/icons/bulk/referral-icon.svg";
import classes from "./styles.module.scss";

function ReferralIcon(props: { [key: string]: any }) {
  return (
    <ReferralIconSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { ReferralIcon };
