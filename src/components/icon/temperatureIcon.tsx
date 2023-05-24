import {ReactComponent as TemperatureSVG} from "assets/icons/bold/temperature.svg";

function TemperatureIcon(props: { [key: string]: any }) {
  return <TemperatureSVG data-variant="bold" {...props} />;
}

export { TemperatureIcon };
