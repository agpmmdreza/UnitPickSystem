import classes from "./components/styles.module.scss";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SidebarBase } from "./components/base";
import clsx from "clsx";
import { HamburgerMenuButton } from "./components/hamburgerMenuButton";
import { LARGE, MEDIUM, X_LARGE } from "constants/breakpoints";

export interface ISidebarChildItem {
  id: string;
  name: string;
  path: string;
}
export interface ISidebarItem {
  id: string;
  name: string;
  icon: any;
  selectedIcon?: any;
  path?: string;
  child: ISidebarChildItem[];
}
export interface ISidebarContext {
  sideIn: boolean;
  setSideIn: (value: boolean) => void;
  selectedItemParentId: string;
  setSelectedItemParentId: (value: string) => void;
  selectedItemChildId: string;
  setSelectedItemChildId: (value: string) => void;
  setAutoSideOut: (value: boolean) => void;
  setMobileSidebarFix: (value: boolean) => void;
}
export const SidebarContext = createContext<ISidebarContext>({
  sideIn: false,
  setSideIn: () => null,
  selectedItemParentId: "",
  setSelectedItemParentId: () => null,
  selectedItemChildId: "",
  setSelectedItemChildId: () => null,
  setAutoSideOut: () => null,
  setMobileSidebarFix: () => null,
});

interface ISidebarProps extends PropsWithChildren<any> {
  children?: any;
}
function Sidebar({ children }: ISidebarProps): JSX.Element {
  const [sideIn, setSideIn] = useState(
    document.body.clientWidth > MEDIUM ? false : true
  ); //true means that the sidebar is closed
  const [selectedItemParentId, setSelectedItemParentId] = useState("");
  const [selectedItemChildId, setSelectedItemChildId] = useState<string>("");
  const [breakpoint, setBreakpoint] = useState(X_LARGE);
  const [autoSideOut, setAutoSideOut] = useState(true);
  //NOTE: the autoSideOut is for that when the width is greater than X_LARGE and the user clicked the sideIn button then we memorize the user's decision and when we resize the window (width is still greater than X_LARGE) sidebar will not automatically side out. But this will be reset when we resize the window and pass the breakpoint (in this case width is less than X_LARGE). If you want not to reset the autoSideOut value you have to set it to the `sideIn` value in the menu button click event and remove setAutoSideOut in setting breakpoint section in resizeHandler.

  const [mobileSidebarFix, setMobileSidebarFix] = useState(false);
  //NOTE: the mobileSidebarFix is for that when we enter into the mobile mode the sidebar will automatically close and when the user opens it and then try to resize the window, the sidebar must not close.

  // console.log(breakpoint);

  const resizeHandler = useCallback(() => {
    const width = window.innerWidth;

    //setting breakpoint
    if (width > X_LARGE) {
      setBreakpoint(X_LARGE);
      if (autoSideOut) {
        setSideIn(false);
      }
    } else if (width > LARGE && width < X_LARGE) {
      setBreakpoint(LARGE);
      // if you want to not reset the user's decision about not to auto side out then remove next line
      setAutoSideOut(true);
    } else if (width > MEDIUM && width < LARGE) {
      document.body.style.overflowY = "auto";
      setMobileSidebarFix(false);
      setBreakpoint(MEDIUM);
      // if you want to not reset the user's decision about not to auto side out then remove next line
      setAutoSideOut(true);
    }

    //sideIn in breakpoints
    if (width < breakpoint) {
      if (width < MEDIUM) {
        if (!mobileSidebarFix) {
          setSideIn(true);
        }
      } else {
        setSideIn(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint, autoSideOut, mobileSidebarFix]);

  useEffect(() => {
    // console.log("resize event lister added");
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      // console.log("resize event lister removed");
    };
  }, [resizeHandler]);

  return (
    <div>
      <SidebarContext.Provider
        value={{
          sideIn: sideIn,
          setSideIn: setSideIn,
          selectedItemChildId: selectedItemChildId,
          selectedItemParentId: selectedItemParentId,
          setSelectedItemChildId: setSelectedItemChildId,
          setSelectedItemParentId: setSelectedItemParentId,
          setAutoSideOut: setAutoSideOut,
          setMobileSidebarFix: setMobileSidebarFix,
        }}
      >
        <SidebarBase />
        <HamburgerMenuButton />
      </SidebarContext.Provider>
      <div
        className={clsx([
          "w-100",
          classes.main,
          sideIn ? classes.main_paddingLeft : null,
        ])}
      >
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
