import {ReactComponent as TickSVG} from "assets/icons/bulk/tick.svg";

function Tick(props: { [key: string]: any }) {
  return <TickSVG data-variant="bulk" {...props} />;
}

export { Tick };
