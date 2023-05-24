import {ReactComponent as ArrowLeftLinearSVG} from "assets/icons/linear/arrow-left-linear.svg";
import {ReactComponent as ArrowLeftBoldSVG} from "assets/icons/bold/arrow-left-bold.svg";

function ArrowLeftLinear(props: { [key: string]: any }) {
  return <ArrowLeftLinearSVG data-variant="linear" {...props} />;
}

function ArrowLeftBold(props: { [key: string]: any }) {
  return <ArrowLeftBoldSVG data-variant="bold" {...props} />;
}

export { ArrowLeftLinear, ArrowLeftBold };
