import clsx from "clsx";
import Avatar from "components/core/avatar";
import { Dropdown } from "components/core/dropdown";
import DropdownItem from "components/core/dropdownItem";
import { DropdownMenu } from "components/core/dropdownMenu";
import { PasswordCheckLinear, VerifyBold, VerifyLinear } from "components/icon";
import { useContext } from "react";
import { SidebarContext } from "..";
import classes from "./styles.module.scss";
import { useAuth } from "hooks/useAuth";
import { useProfile } from "hooks/useProfile";
import { useHistory } from "react-router";

export function AccountMenu() {
  const profile = useProfile();
  const { sideIn } = useContext(SidebarContext);
  const { roles, role } = useAuth();
  const history = useHistory();

  return (
    <div className={classes.accountMenuContainer}>
      <div className={classes.avatarContainer}>
        <Dropdown anchor="left" className={classes.flex}>
          <div
            id="account-toggle"
            className={clsx([
              classes.accountToggle,
              sideIn ? classes.clearPadding : null,
            ])}
          >
            <Avatar
              name="John Doe"
              src={""}
              className={clsx([classes.cursorPointer, classes.avatar])}
            />
            <div
              className={clsx([
                classes.profileContent,
                sideIn ? "d-none" : null,
              ])}
            >
              <div className="d-flex">
                <div className={classes.profileName}>
                  {`${profile.data?.data.data?.firstName} ${profile.data?.data.data?.lastName}`}
                </div>
                <div className={classes.verifyImage}>
                  <VerifyBold />
                </div>
              </div>
              <div className={classes.profileRole}>
                {roles?.find((item) => item.role === role)?.roleName}
              </div>
            </div>
          </div>
          <DropdownMenu
            anchor="right-top"
            toggleId="account-toggle"
            isNested={true}
            nestedToggleId="switch-account-toggle"
            className={clsx([
              !sideIn
                ? classes.accountDropdownWithPadding
                : classes.accountDropdown,
            ])}
          >
            <DropdownItem
              onClick={() => history.push("./change-password")}
              className={classes.accountMenuItem}
            >
              <div className="d-flex">
                <PasswordCheckLinear />
                <div className="ms-2">Change Password</div>
              </div>
            </DropdownItem>
            <Dropdown anchor="right" className={classes.dropdown}>
              <DropdownItem
                id="switch-account-toggle"
                className={classes.accountMenuItem}
              >
                <div className="d-flex">
                  <VerifyLinear />
                  <div className="ms-2">Switch Account</div>
                </div>
              </DropdownItem>
              <DropdownMenu
                anchor="right-top"
                toggleId="switch-account-toggle"
                className={clsx([classes.nestedDropdown])}
              >
                {roles?.map((item) => (
                  <DropdownItem
                    key={item.roleName + item.facilityId}
                    className={clsx([
                      classes.accountMenuItem,
                      classes.accountMenuPaddingRight,
                    ])}
                    onClick={() => {
                      // changeRole(item.role, item.facilityId);
                      document.body.style.overflowY = "auto";
                    }}
                  >
                    <div className="d-flex">
                      <Avatar
                        name={item.roleName}
                        src=""
                        className={clsx([classes.avatar])}
                      />
                      <div className="ms-3">
                        <div className={classes.profileName}>
                          {item.roleName}
                        </div>
                        <div className={classes.profileRole}>
                          {item.facility}
                        </div>
                      </div>
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div
        className={clsx([
          classes.pseudoAvatar,
          sideIn ? null : classes.pseudoAvatarWithPadding,
        ])}
      />
    </div>
  );
}
