import {ReactComponent as UsersDuotoneSVG} from "assets/icons/duotone/users.svg";
import classes from "./styles.module.scss";

function UsersDuotone(props: { [key: string]: any }) {
  return (
    <UsersDuotoneSVG
      className={classes.icon}
      data-variant="duotone"
      {...props}
    />
  );
}

export { UsersDuotone };
