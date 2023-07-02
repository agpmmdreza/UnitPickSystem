import clsx from "clsx";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChildItemsContainer } from "./childItemContainer";
import classes from "./styles.module.scss";
import { ISidebarItem, SidebarContext } from "..";
import { useLocation } from "react-router";
import { closeSidebar } from "./helperFunctions";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ILinkProducerProps extends PropsWithChildren<any> {
  children?: any;
  path: string | undefined | null;
}
function LinkProducer({ path, children }: ILinkProducerProps) {
  if (path !== undefined && path !== null) {
    return <Link to={path}>{children}</Link>;
  } else {
    return <>{children}</>;
  }
}
export interface ISidebarMenuItemProps {
  item: ISidebarItem;
}

export function SidebarMenuItem({ item }: ISidebarMenuItemProps) {
  const [collapse, setCollapse] = useState(true); //false means menu is open
  const { sideIn, setSideIn, selectedItemParentId, setSelectedItemParentId } =
    useContext(SidebarContext);

  const Icon = item.icon;
  const SelectedIcon = item.selectedIcon || null;

  useEffect(() => {
    if (sideIn) {
      setCollapse(true);
    } else {
      if (selectedItemParentId === item.id) {
        setCollapse(false);
      }
      // } else {
      //   setCollapse(true);
      // }
    }
  }, [sideIn, selectedItemParentId, item.id]);

  const location = useLocation();
  useEffect(() => {
    if (item.path && item.path !== "" && item.path !== "/") {
      const index = location.pathname
        .toLocaleLowerCase()
        .indexOf(item.path.toLocaleLowerCase(), 0);
      // console.log(index);
      // console.log(item.path.toLocaleLowerCase());
      // console.log(location.pathname);

      if (index === 0) {
        // console.log("item matched");
        setSelectedItemParentId(item.id);
      }
    }
  }, [location, item, setSelectedItemParentId]);
  return (
    <div className={clsx([classes.menuItem, sideIn ? classes.center : null])}>
      <div
        className={clsx([
          classes.menuItemIconContainer,
          selectedItemParentId === item.id ? classes.selectedItem : null,
        ])}
      >
        <LinkProducer path={item.path}>
          <div
            className={classes.itemIcon}
            onClick={() => {
              if (item.child.length !== 0) {
                setSideIn(false);
                setCollapse(!collapse);
              } else {
                //   setSelectedItemParentId(item.id);
                // if (document.body.clientWidth <= LARGE) {
                //   //we are in mobile mode
                //   setSideIn(true);
                //   document.body.style.overflowY = "auto";
                // }
                closeSidebar(setSideIn);
              }
            }}
          >
            {selectedItemParentId === item.id ? (
              SelectedIcon ? (
                <SelectedIcon />
              ) : (
                ""
              )
            ) : (
              <Icon />
            )}
          </div>
        </LinkProducer>
        {!sideIn && (
          <LinkProducer path={item.path}>
            <div
              className={clsx([
                classes.rootItem,
                selectedItemParentId === item.id ? classes.selectedItem : null,
                sideIn ? classes.hideText : null,
              ])}
              onClick={(e) => {
                if (item.child.length !== 0) {
                  setCollapse(!collapse);
                } else {
                  //    setSelectedItemParentId(item.id);
                  // if (document.body.clientWidth <= LARGE) {
                  //   //we are in mobile mode
                  //   setSideIn(true);
                  //   document.body.style.overflowY = "auto";
                  // }
                  closeSidebar(setSideIn);
                }
              }}
            >
              <span className={clsx(["d-block", classes.itemLabel])}>
                {item.name}
              </span>
              {item.child.length !== 0 && (
                <div
                  className={clsx([
                    "d-flex me-auto",
                    classes.arrow,
                    !collapse ? classes.rotateDown : null,
                  ])}
                >
                  <ChevronDownIcon />
                </div>
              )}
            </div>
          </LinkProducer>
        )}
      </div>

      <div
        className={clsx([
          sideIn ? classes.hideText : null,
          classes.menuItemText,
        ])}
      >
        {item.child.length !== 0 && (
          <ChildItemsContainer collapse={collapse} item={item} />
        )}
      </div>
    </div>
  );
}
