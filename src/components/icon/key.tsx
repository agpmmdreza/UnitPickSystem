import {ReactComponent as KeyBoldSVG} from "assets/icons/bold/key-bold.svg";

function KeyBold(props: { [key: string]: any }) {
  return <KeyBoldSVG data-variant="bold" {...props} />;
}

export { KeyBold };
