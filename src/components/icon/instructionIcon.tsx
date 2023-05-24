import {ReactComponent as InstructionIconSVG} from "assets/icons/bulk/instruction-icon.svg";
import classes from "./styles.module.scss";

function InstructionIcon(props: { [key: string]: any }) {
  return (
    <InstructionIconSVG
      data-variant="bulk"
      className={classes.icon}
      {...props}
    />
  );
}

export { InstructionIcon };
