import Button from "components/core/button";
import {useHistory} from "react-router-dom";
import classes from "./styles.module.scss";
import {useAuth} from "hooks/useAuth";

const NOT_FOUND_DESCRIPTION = `The Page You’re looking for isn’t found :(`;
const BACK_TO_HOM_DESCRIPTION = `We Suggest you back to home`;

interface INotFoundProps {
  isInPanel?: boolean;
}

function NotFound({ isInPanel }: INotFoundProps) {
  const history = useHistory();
  const { roles, isLoggedIn } = useAuth();
  const handleRedirect = () => {
    if (isLoggedIn && roles) {
      history.push(`/panel/${roles[0].role}/`);
    } else history.goBack();
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.pageContent}>
        <span className={classes.pageText}>{NOT_FOUND_DESCRIPTION}</span>
        <span className={classes.pageText}>{BACK_TO_HOM_DESCRIPTION}</span>
        <Button className={classes.btnStyle} onClick={handleRedirect}>
          {isLoggedIn && roles ? "Back to Home" : "Back"}
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
