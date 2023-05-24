import {ReactComponent as ThumbUpSVG} from "assets/icons/bulk/thumb-up.svg";

function ThumbUp(props: { [key: string]: any }) {
  return <ThumbUpSVG data-variant="bulk" {...props} />;
}

export { ThumbUp };
