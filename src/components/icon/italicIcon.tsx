import {ReactComponent as ItalicSVG} from "assets/icons/bold/italic-icon.svg";

function ItalicIcon(props: { [key: string]: any }) {
  return <ItalicSVG data-variant="bold" {...props} />;
}

export { ItalicIcon };
