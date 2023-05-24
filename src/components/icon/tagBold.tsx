import {ReactComponent as TagBoldSVG} from "assets/icons/bold/tag-bold.svg";
import classes from "./styles.module.scss";

function TagBold(props: { [key: string]: any }) {
  return <TagBoldSVG data-variant="bold" className={classes.icon} {...props} />;
}

export { TagBold };
