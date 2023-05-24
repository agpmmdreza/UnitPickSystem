import {ReactComponent as UsersBoldSVG} from "assets/icons/bold/users-bold.svg";

function UsersBold(props: { [key: string]: any }) {
  return <UsersBoldSVG data-variant="bold" {...props} />;
}

export { UsersBold };
