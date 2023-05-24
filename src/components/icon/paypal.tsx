import {ReactComponent as PaypalSVG} from "assets/icons/bulk/paypal.svg";

function PaypalImg(props: { [key: string]: any }) {
  return <PaypalSVG data-variant="bulk" {...props} />;
}

export { PaypalImg };
