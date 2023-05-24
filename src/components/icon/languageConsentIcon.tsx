import {ReactComponent as LanguageConsentSVG} from "assets/icons/bulk/language-consent.svg";
import classes from "./styles.module.scss";

function LanguageConsentIcon(props: { [key: string]: any }) {
  return (
    <LanguageConsentSVG
      data-variant="bulk"
      className={classes.icon}
      {...props}
    />
  );
}

export { LanguageConsentIcon };
