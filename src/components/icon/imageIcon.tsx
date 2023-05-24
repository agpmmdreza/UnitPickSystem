import {ReactComponent as ImageSVG} from "assets/icons/bold/image-icon.svg";

function ImageIcon(props: { [key: string]: any }) {
  return <ImageSVG data-variant="bold" {...props} />;
}

export { ImageIcon };
