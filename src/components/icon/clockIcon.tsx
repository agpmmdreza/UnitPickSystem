import {ReactComponent as ClockIconSVG} from "assets/icons/bulk/clock-icon.svg";

function ClockIcon(props: { [key: string]: any }) {
  return <ClockIconSVG data-variant="bold" {...props} />;
}

export { ClockIcon };
