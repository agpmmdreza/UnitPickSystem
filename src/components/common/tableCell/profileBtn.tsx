import clsx from "clsx";
import Button from "components/core/button";
import {useHistory} from "react-router";
import classes from "./styles.module.scss";

type Props = { path: string; disabled: boolean; state?: any };

const ProfileBtn = ({ path, disabled, state }: Props) => {
  const history = useHistory();

  return (
    <div className=" d-flex justify-content-center">
      <Button
        disabled={disabled}
        onClick={() => history.push(path, state)}
        size="small"
        variant="text"
        className={clsx([classes.textDecorationNone, classes.profileCell])}
      >
        View Profile
      </Button>
    </div>
  );
};

export default ProfileBtn;
