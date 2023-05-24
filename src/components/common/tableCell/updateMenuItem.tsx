// import { TRoleName } from "api/user";
import DropdownItem from "components/core/dropdownItem";
import {useHistory} from "react-router";
// import { getURLByRole } from "utils/mappers";
import classes from "./styles.module.scss";
import {useBaseUrl} from "../../../utils/route";

export interface IUpdateMenuItemProps {
  rowId: number;
  updateByRole: boolean;
  data: any;
  path?: string;
  query?: string;
  label?: string;
  state?: any;
  parentId?: number | null; // that for facility and its branch
}

export function UpdateMenuItem({
  rowId,
  updateByRole,
  data,
  path,
  query,
  label,
  state,
  parentId,
}: IUpdateMenuItemProps) {
  const history = useHistory();
  // const allRoles: TRoleName[] = data.all_roles;
  const userId = data.id;
  const baseURL = useBaseUrl();
  // const roleURL = getURLByRole(allRoles, userId, "edit");
  const roleURL = "";

  //Gets the role and update menu item based on role

  const editURL = baseURL + roleURL;
  const clickHandler = () => {
    // console.log(parentId);

    if (updateByRole) {
      if (!!roleURL) {
        history.push(editURL);
      }
    } else {
      if (parentId !== null && !!parentId) {
        history.push(
          `${history.location.pathname}/${rowId}?parentId=${parentId}`
        );
      } else
        history.push({
          pathname: `${path ?? history.location.pathname}/${rowId}${
            query ? `?${query}` : ""
          }`,
          state: state,
        });
    }
  };

  return (
    <DropdownItem
      onClick={clickHandler}
      className={updateByRole && roleURL === "" ? classes.disableMenuItem : ""}
    >
      <span>{label || "ویرایش"}</span>
    </DropdownItem>
  );
}
