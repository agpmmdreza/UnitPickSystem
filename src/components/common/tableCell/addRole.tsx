import DropdownItem from "components/core/dropdownItem";
import {useHistory} from "react-router";

type Props = {
  rowId: number;
  roles: string[];
};

const AddRoleMenuItem = ({ roles, rowId }: Props) => {
  const history = useHistory();

  return (
    <DropdownItem
      onClick={() => {
        console.log("rowId: " + rowId);
        history.push({
          pathname: `${history.location.pathname}/add-role`,
          state: { roles: roles },
        });
      }}
    >
      <span>Add New Role</span>
    </DropdownItem>
  );
};

export default AddRoleMenuItem;
