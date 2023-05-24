// import clsx from "clsx";
// import { LogoutLinear } from "components/icon";
// import { useContext } from "react";
// import { SidebarContext } from "..";
// import { AccountMenu } from "./accountMenu";
import classes from "./styles.module.scss";
// import { useAuth } from "hooks/useAuth";
import ThemeChanger from "./themeChanger";

export function SidebarFooter() {
  // const { sideIn } = useContext(SidebarContext);
  // const { logOut } = useAuth();

  return (
    <div className={classes.sidebarFooter}>
      {/* <div className={classes.profile}> Profile</div> */}
      {/* <div
        className={clsx([
          classes.sidebarFooterContentContainer,
          sideIn ? classes.wrap : null,
        ])}
      >
        <AccountMenu />
        <div
          className={clsx([
            classes.logoutBtn,
            sideIn ? classes.logoutBtnCenter : null,
          ])}
          onClick={() => {
            logOut();
            document.body.style.overflowY = "auto";
          }}
        >
          <LogoutLinear />
        </div>
      </div> */}
      <ThemeChanger />
    </div>
  );
}
