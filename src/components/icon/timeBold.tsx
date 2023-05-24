import {ReactComponent as TimeBoldSVG} from "assets/icons/bold/time-bold.svg";

function TimeBold(props: { [key: string]: any }) {
  return <TimeBoldSVG data-variant="bold" {...props} />;
}

export { TimeBold };
