import DropdownItem from "components/core/dropdownItem";
import {useHistory} from "react-router";

export interface IResetMenuItemProps {
  rowId: string | number;
}

//? reset items in dropdown
export function ResetMenuItem({ rowId }: IResetMenuItemProps) {
  const history = useHistory();
  return (
    <DropdownItem
      onClick={() => {
        console.log("reset password action on row: " + rowId);
        history.push(`${history.location.pathname}/reset-password/${rowId}`);
      }}
    >
      <span>Reset Password</span>
    </DropdownItem>
  );
}
