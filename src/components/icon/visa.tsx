import {ReactComponent as VisaSVG} from "assets/icons/bulk/visa.svg";

function VisaImg(props: { [key: string]: any }) {
  return <VisaSVG data-variant="bulk" {...props} />;
}

export { VisaImg };
