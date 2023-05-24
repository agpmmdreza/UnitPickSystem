import clsx from "clsx";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ISidebarChildItem, SidebarContext } from "..";
import classes from "./styles.module.scss";
import { useLocation } from "react-router";
import { closeSidebar } from "./helperFunctions";

export interface IChildItemProps {
  child: ISidebarChildItem;
  parentId: string;
}

export function ChildItem({ child, parentId }: IChildItemProps) {
  const {
    setSelectedItemChildId,
    setSelectedItemParentId,
    selectedItemChildId,
    selectedItemParentId,
    setSideIn,
  } = useContext(SidebarContext);

  const location = useLocation();
  useEffect(() => {
    if (child.path !== "" && child.path !== "/") {
      const index = location.pathname
        .toLocaleLowerCase()
        .indexOf(child.path.toLocaleLowerCase(), 0);

      if (index === 0) {
        // console.log("child item matched");
        setSelectedItemParentId(parentId);
        setSelectedItemChildId(child.id);
      }
    }
  }, [
    location,
    child,
    parentId,
    setSelectedItemParentId,
    setSelectedItemChildId,
  ]);
  const isChildItemSelected =
    selectedItemParentId === parentId && selectedItemChildId === child.id;
  return (
    <Link
      to={child.path}
      className="d-flex align-content-center"
      onClick={() => {
        // setSelectedItemChildId(child.id);
        // setSelectedItemParentId(parentId);
        // if (document.body.clientWidth <= MEDIUM) {
        //   //we are in mobile mode
        //   setSideIn(true);
        //   document.body.style.overflowY = "auto";
        // }
        closeSidebar(setSideIn);
      }}
    >
      <div
        className={clsx([
          classes.childItem,
          isChildItemSelected ? classes.selectedItem : null,
          // isChildItemSelected ? classes.selectedItemBG : null,
        ])}
      >
        {/* {isChildItemSelected && (
          <div className={classes.selectedItemBGBefore}></div>
        )} */}
        <li>{child.name}</li>
      </div>
    </Link>
  );
}
