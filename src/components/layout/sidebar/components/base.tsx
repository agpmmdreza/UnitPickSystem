import classes from "./styles.module.scss";
import clsx from "clsx";
// import Input from "components/core/input";
import { useContext, useEffect, useState } from "react";
// import { SideMenuButton } from "./sideMenuButton";
import { SidebarHeader } from "./header";
import { SidebarMenuItem } from "./sidebarMenuItem";
import { ISidebarItem, SidebarContext } from "..";
import { useLocation } from "react-router";
import {
  MasterItems,
  StudentItems,
  SuperAdminItems,
} from "constants/sidebarItems";

export function SidebarBase() {
  const [items, setItems] = useState<ISidebarItem[]>([]);
  // const [filteredItems, setFilteredItems] = useState<ISidebarItem[]>([]);
  const { sideIn } = useContext(SidebarContext);
  // const [searchParameter, setSearchParameter] = useState("");
  const location = useLocation();
  useEffect(() => {
    const splitPathname = location.pathname.toLocaleLowerCase().split("/");
    switch (splitPathname[2].toLowerCase()) {
      case "admin":
        setItems(SuperAdminItems);
        break;

      case "master":
        setItems(MasterItems);
        break;

      case "student":
        setItems(StudentItems);
        break;

      default:
        setItems([]);
        break;
    }
  }, [location]);

  // useEffect(() => {
  //   const filteredChildren = items.filter(
  //     (t) =>
  //       t.name
  //         .toLocaleLowerCase()
  //         .includes(searchParameter.toLocaleLowerCase()) ||
  //       t.child.some((ch) =>
  //         ch.name
  //           .toLocaleLowerCase()
  //           .includes(searchParameter.toLocaleLowerCase())
  //       )
  //   );
  //   setFilteredItems(filteredChildren);
  // }, [searchParameter, items]);

  return (
    <div className="position-fixed" style={{ zIndex: "102" }}>
      <div
        className={clsx([
          classes.sidebarContainer,
          sideIn ? classes.sideIn : null,
        ])}
      >
        <SidebarHeader />
        {/* <div
          className={classes.searchInputContainer}
          onClick={() => setSideIn(false)}
        >
          <Input
            type="search"
            placeholder="Search"
            value={searchParameter}
            onChange={(e) => setSearchParameter(e.target.value)}
          />
        </div> */}
        <div
          className={clsx([
            classes.menuItemContainer,
            sideIn && "pt-2",
            // sideIn ? classes.hiddenScroll : null,
          ])}
        >
          {items.map((item, index) => (
            <SidebarMenuItem key={index} item={item} />
          ))}
        </div>
        {/* <SidebarFooter /> */}
        {/* this is for mobile version */}
        {/* <SidebarMobileLogo /> */}
      </div>
    </div>
  );
}
