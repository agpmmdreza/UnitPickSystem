import {ReactComponent as IntakeFormDuotoneSVG} from "assets/icons/duotone/intake-form.svg";
import classes from "./styles.module.scss";

function IntakeFormDuotone(props: { [key: string]: any }) {
  return (
    <IntakeFormDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { IntakeFormDuotone };
