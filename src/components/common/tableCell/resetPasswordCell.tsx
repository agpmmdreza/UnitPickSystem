import {memo} from "react";
import {Link, useHistory} from "react-router-dom";
import classes from "./styles.module.scss";

//? a cell in table that handles password changing
function ResetPasswordCell(props: any) {
  const row_id = Number(props.data[Number(props.row.id)].id);
  const history = useHistory();

  return (
    <div className="w-100 d-flex flex-row justify-content-center">
      <Link
        to={`${history.location.pathname}/reset-password/${row_id}`}
        className={classes.resetPasswordCell}
      >
        Reset
      </Link>
    </div>
  );
}
export default memo(ResetPasswordCell);
