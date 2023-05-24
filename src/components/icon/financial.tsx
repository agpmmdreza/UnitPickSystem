import {ReactComponent as FinancialDuotoneSVG} from "assets/icons/duotone/financial.svg";
import classes from "./styles.module.scss";

function FinancialDuotone(props: { [key: string]: any }) {
  return (
    <FinancialDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { FinancialDuotone };
