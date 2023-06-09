import classes from "./styles.module.scss";
import { SidebarContext } from "..";
import { FunctionComponent, useContext } from "react";
import Avatar from "components/core/avatar";
import clsx from "clsx";
import Button from "components/core/button";
import { Dropdown } from "components/core/dropdown";
import DropdownItem from "components/core/dropdownItem";
import { DropdownMenu } from "components/core/dropdownMenu";

import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router";
import { useProfile } from "hooks/useProfile";
import { MEDIUM } from "constants/breakpoints";
import { closeSidebar } from "./helperFunctions";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

interface IAvatarDropdownItems {
  label: string;
  icon: FunctionComponent;
  nestedItems?: JSX.Element[];
  onClick?: () => void;
}

/** Sidebar Header Component */
export function SidebarHeader() {
  const { sideIn, setSideIn } = useContext(SidebarContext);
  const { roles, role, logOut } = useAuth();
  const profile = useProfile();
  const profileName = `${profile.data?.data.data?.firstName} ${profile.data?.data.data?.lastName}`;
  const history = useHistory();

  /** Avatar settings dropdown items */
  const AVATAR_DROPDOWN_ITEMS: IAvatarDropdownItems[] = [
    {
      label: "ویرایش پروفایل",
      icon: UserIcon,
      onClick: () => {
        history.push(`/panel/${role}/profile-management/view-profile`);
        closeSidebar(setSideIn);
      },
    },
    {
      label: "تغییر رمز عبور",
      icon: LockClosedIcon,
      onClick: () => {
        history.push(`/panel/${role}/change-password`);
        closeSidebar(setSideIn);
      },
    },

    {
      label: "خروج از حساب",
      icon: ChevronLeftIcon,
      onClick: () => logOut(),
    },
  ];

  return (
    <>
      <div className="d-flex flex-column">
        <div
          className={
            sideIn ? classes.sidebar_header__min : classes.sidebar_header
          }
        >
          <div className={classes.header__top}>
            <div
              className={clsx(
                classes.logoContainer,
                sideIn && classes.hideText
              )}
            >
              <Avatar
                name={profileName}
                size={sideIn ? "big" : "large"}
                src={""}
              />
            </div>
          </div>

          <div
            className={sideIn ? classes.avatar__min : classes.avatar__container}
          >
            <Dropdown anchor="bottom">
              <Button
                rootAttributes={{
                  id: "avatar-setting",
                }}
                variant="text"
                size={sideIn ? "small" : "normal"}
                className={clsx(
                  classes.avatar_setting__icon,
                  sideIn && classes.avatar_setting_icon__min
                )}
              >
                <Cog6ToothIcon />
              </Button>

              <DropdownMenu
                isNested
                anchor={
                  document.body.clientWidth <= MEDIUM
                    ? "bottom-end"
                    : "bottom-start"
                }
                toggleId="avatar-setting"
                nestedToggleId="avater-nested-container"
                className={classes.avatarSettingDropdownMenu}
              >
                {AVATAR_DROPDOWN_ITEMS.map(
                  ({ label, icon: Icon, nestedItems, onClick }, index) =>
                    nestedItems ? (
                      <Dropdown
                        anchor="right"
                        id="avater-nested-container"
                        key={index}
                      >
                        <DropdownItem
                          id="switch-nested"
                          className={classes.avatar__dropdownItem}
                        >
                          {Icon && <Icon />}
                          <span className="ms-2"> {label}</span>
                          <div className={classes.avatar__dropdownNestedIcon}>
                            <ChevronRightIcon />
                          </div>
                        </DropdownItem>
                        <DropdownMenu
                          menuAttributes={{
                            style: {
                              marginLeft: "6px",
                              marginBottom: "-61px",
                              zIndex: "999",
                              maxHeight: "300px",
                              overflowY: "auto",
                              paddingRight: "8px",
                            },
                          }}
                          anchor="right-bottom"
                          toggleId="switch-nested"
                        >
                          {nestedItems}
                        </DropdownMenu>
                      </Dropdown>
                    ) : (
                      <DropdownItem
                        onClick={onClick}
                        className={classes.avatar__dropdownItem}
                        key={index}
                      >
                        {Icon && <Icon />}
                        <span className="ms-2"> {label}</span>
                      </DropdownItem>
                    )
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {!sideIn && (
            <div className={classes.info}>
              <span className={classes.info__name}>
                {`${profile.data?.data.data?.firstName} ${profile.data?.data.data?.lastName}`}
              </span>
              <span className={classes.info__role}>
                {roles?.find((item) => item.role === role)?.roleName}
              </span>
            </div>
          )}
        </div>
        {/* {!sideIn && (
          <div className={classes.info}>
            <span className={classes.info__name}>
              {`${profile.data?.data.data?.firstName} ${profile.data?.data.data?.lastName}`}
            </span>
            <span className={classes.info__role}>
              {roles?.find((item) => item.role === role)?.roleName}
            </span>
          </div>
        )} */}
      </div>
    </>
  );
}
