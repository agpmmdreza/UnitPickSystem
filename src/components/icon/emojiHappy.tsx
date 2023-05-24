// emoji-happy-bold.svg
// emoji-happy-linear.svg

import {ReactComponent as EmojiHappyBoldSVG} from "assets/icons/bold/emoji-happy-bold.svg";
import {ReactComponent as EmojiHappyLinearSVG} from "assets/icons/linear/emoji-happy-linear.svg";

function EmojiHappyBold(props: { [key: string]: any }) {
  return <EmojiHappyBoldSVG data-variant="bold" {...props} />;
}

function EmojiHappyLinear(props: { [key: string]: any }) {
  return <EmojiHappyLinearSVG data-variant="linear" {...props} />;
}

export { EmojiHappyBold, EmojiHappyLinear };
