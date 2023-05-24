import {ReactComponent as BulletListSVG} from "assets/icons/bold/bullet-list-icon.svg";

function BulletListIcon(props: { [key: string]: any }) {
  return <BulletListSVG data-variant="bold" {...props} />;
}

export { BulletListIcon };
