import {ReactComponent as ReviewSVG} from "assets/icons/bulk/review.svg";
import classes from "./styles.module.scss";

function ReviewBulk(props: { [key: string]: any }) {
  return <ReviewSVG data-variant="bulk" className={classes.icon} {...props} />;
}

export { ReviewBulk };
