import {ReactComponent as EducationIconSVG} from "assets/icons/bulk/education-icon.svg";
import classes from "./styles.module.scss";

function EducationIcon(props: { [key: string]: any }) {
  return (
    <EducationIconSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { EducationIcon };
