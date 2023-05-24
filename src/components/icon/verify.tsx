import {ReactComponent as VerifyBoldSVG} from "assets/icons/bold/verify-bold.svg";
import {ReactComponent as VerifyLinearSVG} from "assets/icons/linear/verify-linear.svg";

function VerifyBold(props: { [key: string]: any }) {
  return <VerifyBoldSVG data-variant="bold" {...props} />;
}
function VerifyLinear(props: { [key: string]: any }) {
  return <VerifyLinearSVG data-variant="linear" {...props} />;
}

export { VerifyBold, VerifyLinear };
