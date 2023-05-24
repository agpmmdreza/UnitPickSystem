import {ReactComponent as FamilyDuotoneSVG} from "assets/icons/duotone/family.svg";
import classes from "./styles.module.scss";

function FamilyDuotone(props: { [key: string]: any }) {
  return (
    <FamilyDuotoneSVG className={classes.icon} data-variant="bulk" {...props} />
  );
}

export { FamilyDuotone };
