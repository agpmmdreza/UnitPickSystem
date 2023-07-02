// import { ReactComponent as BackIcon } from "assets/icons/bold/arrow-circle-left.svg";
import { useHistory } from "react-router";
import classes from "../styles.module.scss";

interface IBackGroupProps {
  editPath: string;
}

function EditGroup({ editPath }: IBackGroupProps) {
  return <button className={classes.mainIconContainer}></button>;
}

export default EditGroup;
