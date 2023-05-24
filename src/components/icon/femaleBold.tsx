import {ReactComponent as GenderBoldSVG} from "assets/icons/bold/gender-bold.svg";

function FemaleBold(props: { [key: string]: any }) {
  return <GenderBoldSVG data-variant="bold" {...props} />;
}

export { FemaleBold };
