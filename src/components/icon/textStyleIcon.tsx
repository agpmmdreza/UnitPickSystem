import {ReactComponent as TextStyleSVG} from "assets/icons/bold/text-style-icon.svg";

function TextStyleIcon(props: { [key: string]: any }) {
  return <TextStyleSVG data-variant="bold" {...props} />;
}

export { TextStyleIcon };
