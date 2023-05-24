import {ReactComponent as PlayBoldSvg} from "assets/icons/bold/play-bold.svg";

// phone icon component
function PlayBold(props: { [key: string]: any }) {
  return <PlayBoldSvg data-variant="bold" {...props} />;
}

export { PlayBold };
