import {ReactComponent as ArrowUpLinearSVG} from "assets/icons/linear/arrowup-linear.svg";
import classes from "./styles.module.scss";

function ArrowUpLinear(props: { [key: string]: any }) {
  return (
    <ArrowUpLinearSVG
      data-variant="linear"
      className={classes.icon}
      {...props}
    />
  );
}

export { ArrowUpLinear };
