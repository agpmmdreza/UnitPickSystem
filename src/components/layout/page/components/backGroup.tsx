import { ReactComponent as BackIcon } from "assets/icons/bold/arrow-circle-left.svg";
import { useHistory } from "react-router";
import classes from "../styles.module.scss";

interface IBackGroupProps {
  backTo: "pop" | string;
}

function BackGroup({ backTo }: IBackGroupProps) {
  const history = useHistory();

  const handleClick = () => {
    if (backTo === "pop") {
      // pop the browser history
      history.goBack();
    } else {
      history.push(backTo);
    }
  };
  return (
    <button className={classes.mainIconContainer}>
      <BackIcon className={classes.mainIcon} onClick={handleClick} />
    </button>
  );
}

export default BackGroup;
