import {ReactComponent as PrivacyDuotoneSVG} from "assets/icons/duotone/privacy.svg";
import classes from "./styles.module.scss";

function PrivacyDuotone(props: { [key: string]: any }) {
  return (
    <PrivacyDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { PrivacyDuotone };
