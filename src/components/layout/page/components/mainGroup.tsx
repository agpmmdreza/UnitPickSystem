import { ReactComponent as MessageIcon } from "assets/icons/bold/message.svg";
import { ReactComponent as NotificationsIcon } from "assets/icons/bold/notification.svg";
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router";
import classes from "../styles.module.scss";

function MainGroup() {
  const history = useHistory();
  const { role } = useAuth();

  return (
    <>
      <button className={classes.mainIconContainer}>
        <MessageIcon
          className={classes.mainIcon}
          onClick={() => history.push(`/panel/${role}/messages`)}
        />
      </button>
      <button className={classes.mainIconContainer}>
        <NotificationsIcon
          className={classes.mainIcon}
          onClick={() => history.push(`/panel/${role}/notifications`)}
        />
      </button>
    </>
  );
}

export default MainGroup;
