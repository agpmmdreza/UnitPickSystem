// import { ReactComponent as BackIcon } from "assets/icons/bold/arrow-circle-left.svg";
import { useHistory } from "react-router";
import classes from "../styles.module.scss";
import { EditBold } from "components/icon";

interface IBackGroupProps {
  editPath: string;
}

function EditGroup({ editPath }: IBackGroupProps) {
  const history = useHistory();

  return (
    <button className={classes.mainIconContainer}>
      <EditBold
        className={classes.mainIcon}
        onClick={() => history.replace(editPath)}
      />
    </button>
  );
}

export default EditGroup;
