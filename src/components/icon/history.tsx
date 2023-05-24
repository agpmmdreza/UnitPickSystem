import {ReactComponent as PastMedicalHistoryDuotoneSVG} from "assets/icons/duotone/past-medical-history.svg";
import classes from "./styles.module.scss";

function PastMedicalHistoryDuotone(props: { [key: string]: any }) {
  return (
    <PastMedicalHistoryDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { PastMedicalHistoryDuotone };
