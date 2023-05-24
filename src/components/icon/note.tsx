import {ReactComponent as NoteLinearSVG} from "assets/icons/linear/note-linear.svg";

function NoteLinear(props: { [key: string]: any }) {
  return <NoteLinearSVG data-variant="linear" {...props} />;
}

export { NoteLinear };
