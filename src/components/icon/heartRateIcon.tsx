import {ReactComponent as HeartRateSVG} from "assets/icons/bold/heart-rate.svg";

function HeartRateIcon(props: { [key: string]: any }) {
  return <HeartRateSVG data-variant="bold" {...props} />;
}

export { HeartRateIcon };
