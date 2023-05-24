import {ReactComponent as ListInfoSVG} from "assets/icons/bulk/list-info.svg";
import classes from "./styles.module.scss";

function ListInfo(props: { [key: string]: any }) {
  return (
    <ListInfoSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { ListInfo };
