import {ReactComponent as PacsDuotoneSVG} from "assets/icons/duotone/pacs.svg";
import classes from "./styles.module.scss";

function PacsDuotone(props: { [key: string]: any }) {
  return (
    <PacsDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { PacsDuotone };
