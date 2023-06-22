import { IResponse } from "api";
import Button from "components/core/button";
import { Dropdown } from "components/core/dropdown";
import { DropdownMenu } from "components/core/dropdownMenu";
import { ActionMenuBold } from "components/icon";
import { useState } from "react";
import { generateUUIDv4 } from "utils/uuid";
import { DeleteMenuItem } from "./deleteMenuItem";
import { ResetMenuItem } from "./resetMenuItem";
import classes from "./styles.module.scss";
import { UpdateMenuItem } from "./updateMenuItem";
// import { ActiveInactiveCell } from "./activeIactiveMenuItem";
import NotificationAlert from "components/core/notificationAlert";
import { AddBranchMenuItem } from "./addBranchMenuItem";
import { SendMessageMenuItem } from "./sendMessageMenuItem";
import AddRoleMenuItem from "./addRole";

interface IActionProps {
  cellProps: any;
  noUpdateAction?: boolean;
  noResetPasswordAction?: boolean;
  noActiveInactiveAction?: boolean;
  refetch?: () => void; // refetch the table
  deleteMutationFn?: (id: number) => Promise<IResponse<null>>;
  path?: string;
  idAccessor?: string;
  updateByRoleName?: boolean;
  query?: string;
  updateLabel?: string;
  pathState?: any;
  parentId?: number | null;
  facilityId?: number;
  sendMessage?: boolean;
  deleteTitle?: string;
  roles?: string[];
}

//? the last cell in table that handles the deletion and edition od table row with a popup

const POPUP_DESCRIPTION = "آیا مطمئنید که میخوهید این رکورد را حذف کنید؟";

function ActionCell({
  cellProps,
  noResetPasswordAction = true,
  noUpdateAction = false,
  noActiveInactiveAction = true,
  deleteMutationFn,
  refetch,
  path,
  idAccessor = "id",
  updateByRoleName = false,
  updateLabel,
  query,
  pathState,
  parentId,
  facilityId,
  sendMessage,
  deleteTitle,
  roles,
}: IActionProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  // console.log(cellProps);

  const rowId = Number(cellProps.row.original[idAccessor]);
  const toggleBtnId = "actionBtn_" + generateUUIDv4();

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="d-inline-block position-relative">
        <Dropdown anchor="left">
          <Button
            className={classes.actionButton}
            rootAttributes={{ id: toggleBtnId }}
            size="small"
            variant="text"
            icon={ActionMenuBold}
          ></Button>
          <DropdownMenu
            className={classes.actionCellDropdownMenu}
            anchor="bottom-center"
            toggleId={toggleBtnId}
          >
            {noUpdateAction !== true ? (
              <UpdateMenuItem
                rowId={rowId}
                updateByRole={updateByRoleName}
                data={cellProps.row.original}
                path={path}
                query={query}
                label={updateLabel}
                state={pathState}
                parentId={parentId}
              />
            ) : (
              <></>
            )}
            {parentId === null && !!facilityId ? (
              <AddBranchMenuItem parentId={facilityId} />
            ) : (
              <></>
            )}
            {noResetPasswordAction !== true ? (
              <ResetMenuItem rowId={rowId} />
            ) : (
              <></>
            )}
            {deleteMutationFn !== undefined ? (
              <DeleteMenuItem
                rowId={rowId}
                mutationFn={deleteMutationFn}
                refetch={refetch}
                isApproved={isApproved}
                setIsAlertOpen={setIsAlertOpen}
                setIsApproved={setIsApproved}
                deleteTitle={deleteTitle}
              />
            ) : (
              <></>
            )}
            {roles ? <AddRoleMenuItem roles={roles} rowId={rowId} /> : <></>}
            {sendMessage ? (
              <SendMessageMenuItem userId={cellProps.row.original.id} />
            ) : (
              <></>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
      <NotificationAlert
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onApprove={() => setIsApproved(true)}
        title="تایید حذف"
        contnet={POPUP_DESCRIPTION}
      />
    </div>
  );
}

export { ActionCell };
