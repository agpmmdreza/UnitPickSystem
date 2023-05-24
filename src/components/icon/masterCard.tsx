import {ReactComponent as MasterCardSVG} from "assets/icons/bulk/masterCard.svg";

function MasterCardImg(props: { [key: string]: any }) {
  return <MasterCardSVG data-variant="bulk" {...props} />;
}

export { MasterCardImg };
