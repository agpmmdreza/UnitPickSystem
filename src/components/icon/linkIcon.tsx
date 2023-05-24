import {ReactComponent as LinkSVG} from "assets/icons/bold/link-icon.svg";

function LinkIcon(props: { [key: string]: any }) {
  return <LinkSVG data-variant="bold" {...props} />;
}

export { LinkIcon };
