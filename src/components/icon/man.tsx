// man-bold.svg
import {ReactComponent as ManBoldSVG} from "assets/icons/bold/man-bold.svg";

function ManBold(props: { [key: string]: any }) {
  return <ManBoldSVG data-variant="bold" {...props} />;
}

export { ManBold };
