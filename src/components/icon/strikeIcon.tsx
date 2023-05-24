import {ReactComponent as StrikeSVG} from "assets/icons/bold/strike-icon.svg";

function StrikeIcon(props: { [key: string]: any }) {
  return <StrikeSVG data-variant="bold" {...props} />;
}

export { StrikeIcon };
