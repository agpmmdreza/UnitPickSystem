import {ReactComponent as OffTimeSVG} from "assets/icons/bold/off-time-bold.svg";

function OffTime(props: { [key: string]: any }) {
  return <OffTimeSVG data-variant="bold" {...props} />;
}

export { OffTime };
