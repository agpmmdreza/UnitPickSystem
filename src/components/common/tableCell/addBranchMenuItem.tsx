import DropdownItem from "components/core/dropdownItem";
import {useHistory} from "react-router";

export interface IUpdateMenuItemProps {
  parentId: number;
}

export function AddBranchMenuItem({ parentId }: IUpdateMenuItemProps) {
  const history = useHistory();

  if (parentId === null || parentId === undefined) return null;

  return (
    <DropdownItem
      onClick={() =>
        history.push(`${history.location.pathname}/create?parentId=${parentId}`)
      }
    >
      <span>Add Branch</span>
    </DropdownItem>
  );
}
