import {ReactComponent as ArrowRightLinearSVG} from "assets/icons/linear/arrow-right-linear.svg";
import {ReactComponent as ArrowRightBoldSVG} from "assets/icons/bold/arrow-right-bold.svg";

function ArrowRightLinear(props: { [key: string]: any }) {
  return <ArrowRightLinearSVG data-variant="linear" {...props} />;
}

function ArrowRightBold(props: { [key: string]: any }) {
  return <ArrowRightBoldSVG data-variant="bold" {...props} />;
}

export { ArrowRightLinear, ArrowRightBold };
