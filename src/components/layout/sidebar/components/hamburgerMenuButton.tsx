import clsx from "clsx";
import { useContext } from "react";
import { SidebarContext } from "..";
import classes from "./styles.module.scss";

export function HamburgerMenuButton() {
  const { sideIn, setSideIn, setMobileSidebarFix } = useContext(SidebarContext);
  return (
    <div className="position-relative">
      <div
        className={clsx([
          classes.hamburgerMenu,
          !sideIn ? classes.change : null,
        ])}
        onClick={() => {
          sideIn
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "auto");
          setSideIn(!sideIn);
          setMobileSidebarFix(true);
        }}
      >
        <div className="d-inline-block">
          <div className={classes.bar1}></div>
          <div className={classes.bar2}></div>
          <div className={classes.bar3}></div>
        </div>
        <div className={classes.hamburgerMenuText}>Menu</div>
      </div>
    </div>
  );
}
