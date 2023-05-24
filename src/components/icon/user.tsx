import {ReactComponent as UserBoldSVG} from "assets/icons/bold/user-bold.svg";

function UserBold(props: { [key: string]: any }) {
  return <UserBoldSVG data-variant="bold" {...props} />;
}

export { UserBold };
