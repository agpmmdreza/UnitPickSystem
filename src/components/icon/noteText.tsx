import {ReactComponent as NoteBoldSVG} from "assets/icons/bold/note-text-bold.svg";

function NoteBold(props: { [key: string]: any }) {
  return <NoteBoldSVG data-variant="bold" {...props} />;
}

export { NoteBold };
