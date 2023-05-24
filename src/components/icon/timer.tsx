import {ReactComponent as TimerSvg} from "assets/icons/linear/timer.svg";

function Timer(props: { [key: string]: any }) {
  return <TimerSvg data-variant="linear" {...props} />;
}

export { Timer };
