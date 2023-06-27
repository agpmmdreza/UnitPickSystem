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
import { useQuery } from "react-query";
import { getStudentDetail } from "api/auth";
import { IntakeFormDuotone } from "components/icon/intakeForm";
import { IntakeFormBold } from "components/icon/intakeFormBold";

function isDateWithinRange(
  targetDate: Date,
  specifiedDate: Date | undefined | string
): boolean {
  console.log(targetDate, specifiedDate);

  if (specifiedDate) {
    const endDate = new Date(
      new Date(specifiedDate).getTime() + 24 * 60 * 60 * 1000
    );
    return (
      new Date(specifiedDate).getTime() <= targetDate.getTime() &&
      targetDate.getTime() <= endDate.getTime()
    );
  }
  return false;
}

export function SidebarBase() {
  const [items, setItems] = useState<ISidebarItem[]>([]);
  // const [filteredItems, setFilteredItems] = useState<ISidebarItem[]>([]);
  const { sideIn } = useContext(SidebarContext);
  const location = useLocation();
  // const [searchParameter, setSearchParameter] =
  // useState("");
  const { data } = useQuery(["student-detail"], getStudentDetail, {
    enabled:
      location.pathname.toLocaleLowerCase().split("/")[2].toLowerCase() ===
      "student",
  });

  useEffect(() => {
    if (
      location.pathname.toLocaleLowerCase().split("/")[2].toLowerCase() ===
      "student"
    ) {
      setItems(
        isDateWithinRange(
          new Date(),
          data?.data.data?.unitPickTimeTable.pickTime
        ) ||
          isDateWithinRange(
            new Date(),
            data?.data.data?.unitPickTimeTable.modifyTime
          )
          ? StudentItems
          : StudentItems.map((i) => {
              return i.id === "1"
                ? {
                    id: "1",
                    name: "انتخاب واحد",
                    icon: IntakeFormDuotone,
                    selectedIcon: IntakeFormBold,
                    child: [
                      {
                        id: "1",
                        name: "دروس دانشجو در نیمسال",
                        path: "/panel/student/units/chosen",
                      },
                    ],
                  }
                : i;
            })
      );
    }
  }, [data]);

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
        setItems(
          isDateWithinRange(
            new Date(),
            data?.data.data?.unitPickTimeTable.pickTime
          ) ||
            isDateWithinRange(
              new Date(),
              data?.data.data?.unitPickTimeTable.modifyTime
            )
            ? StudentItems
            : StudentItems.map((i) => {
                return i.id === "1"
                  ? {
                      id: "1",
                      name: "انتخاب واحد",
                      icon: IntakeFormDuotone,
                      selectedIcon: IntakeFormBold,
                      child: [
                        {
                          id: "1",
                          name: "دروس دانشجو در نیمسال",
                          path: "/panel/student/units/chosen",
                        },
                      ],
                    }
                  : i;
              })
        );
        break;

      default:
        setItems([]);
        break;
    }
  }, [location]);

  return (
    <div className="position-fixed" style={{ zIndex: "102" }}>
      <div
        className={clsx([
          classes.sidebarContainer,
          sideIn ? classes.sideIn : null,
        ])}
      >
        <SidebarHeader />

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
