import {ReactComponent as FontFamilySVG} from "assets/icons/bold/font-family-icon.svg";

function FontFamilyIcon(props: { [key: string]: any }) {
  return <FontFamilySVG data-variant="bold" {...props} />;
}

export { FontFamilyIcon };
