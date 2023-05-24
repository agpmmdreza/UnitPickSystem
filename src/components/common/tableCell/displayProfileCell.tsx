import {memo} from "react";
import {Link} from "react-router-dom";
import classes from "./styles.module.scss";

//? cell for displaying profile

function DisplayProfileCell(props: any) {
  let row = props.cell.row.original;

  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      <Link
        className={classes.profileCell}
        // TODO: change to link
        to={`${props?.path ?? ""}${row[props?.accessor] ?? row.id}`}
      >
        View Profile
      </Link>
    </div>
  );
}
export default memo(DisplayProfileCell);
