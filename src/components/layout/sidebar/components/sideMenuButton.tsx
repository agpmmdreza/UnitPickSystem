// import Button from "components/core/button";
import classes from "./styles.module.scss";
// import clsx from "clsx";
import { ReactComponent as MenuIcon } from "assets/icons/bold/menu.svg";
import { useContext } from "react";
import { SidebarContext } from "..";
import { X_LARGE } from "constants/breakpoints";
import IconButton from "components/core/iconButton";

function raiseWindowResizeEvent() {
  window.dispatchEvent(new Event("resize"));
}
export function SideMenuButton() {
  const { sideIn, setSideIn, setAutoSideOut } = useContext(SidebarContext);

  return (
    <IconButton
      className={classes.sideMenuButton}
      // size="small"
      variant={"contained"}
      icon={MenuIcon}
      // icon={() => (
      //   <div className={clsx([classes.svgContainer])}>

      //   </div>
      // )}
      onClick={() => {
        // console.log(123);

        if (window.innerWidth >= X_LARGE) {
          setAutoSideOut(false);
          // if you want to not reset the user's decision about not to auto side out then set the value to sideIn value. like this: setAutoSideOut(sideIn);
        }
        setSideIn(!sideIn);
        setTimeout(raiseWindowResizeEvent, 200);
      }}
    />
  );

  // return (
  //   <div
  //     className={clsx([
  //       classes.sideMenuButtonContainer,
  //       sideIn ? classes.sideInMenuButton : null,
  //       sideIn ? classes.rotateRight : null,
  //     ])}
  //   >
  //     <Button
  //       className={classes.sideMenuButton}
  //       size="small"
  //       icon={() => (
  //         <div className={clsx([classes.svgContainer])}>
  //           <MenuIcon />
  //         </div>
  //       )}
  //       onClick={() => {
  //         if (window.innerWidth >= X_LARGE) {
  //           setAutoSideOut(false);
  //           // if you want to not reset the user's decision about not to auto side out then set the value to sideIn value. like this: setAutoSideOut(sideIn);
  //         }
  //         setSideIn(!sideIn);
  //         setTimeout(raiseWindowResizeEvent, 200);
  //       }}
  //     ></Button>
  //   </div>
  // );
}
