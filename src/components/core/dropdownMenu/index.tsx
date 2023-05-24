import clsx from "clsx";
import {HtmlHTMLAttributes, PropsWithChildren, useCallback, useEffect, useState,} from "react";
import classes from "./styles.module.scss";

type anchor =
  | "bottom-start"
  | "bottom-center"
  | "bottom-end"
  | "left-bottom"
  | "left-top"
  | "right-bottom"
  | "right-top"
  | "top-start"
  | "top-center"
  | "top-end";

export interface IDropdownMenuProps extends PropsWithChildren<any> {
  children?: JSX.Element[] | JSX.Element;
  anchor: anchor;
  toggleId: string;
  className?: string;
  isNested?: boolean;
  nestedToggleId?: string;
  menuContainerAttributes?: HtmlHTMLAttributes<HTMLDivElement>;
  menuAttributes?: HtmlHTMLAttributes<HTMLDivElement>;
}

// dropdown menu component
export function DropdownMenu({
  anchor,
  toggleId,
  children,
  className,
  isNested,
  nestedToggleId,
  menuAttributes,
  menuContainerAttributes,
}: IDropdownMenuProps) {
  const [toggle, setToggle] = useState<Element | null>();
  const [nestedToggle, setNestedToggle] = useState<Element | null>();
  const [show, setShow] = useState(false);

  // get nested toggle element if it is nested
  useEffect(() => {
    setNestedToggle(document.querySelector(`#${nestedToggleId}`));
  }, [isNested, nestedToggleId]);

  //get toggle element at first time
  useEffect(() => {
    setToggle(document.querySelector(`#${toggleId}`));
  }, [toggleId]);

  //toggle element has to be close the dropdown menu if it is open and close it when it is open
  const toggleHandler = useCallback(() => setShow(!show), [show]);
  useEffect(() => {
    toggle?.addEventListener("click", toggleHandler);
    return () => toggle?.removeEventListener("click", toggleHandler);
  }, [toggle, toggleHandler]);

  //close the dropdown menu when user clicked outside the toggle element
  const closeDropdownHandler = useCallback(
    (ev: MouseEvent) => {
      if (ev.target instanceof Element) {
        if (isNested === true) {
          if (
            nestedToggle?.contains(ev.target) === false &&
            toggle?.contains(ev.target) === false
          ) {
            setShow(false);
          }
        } else {
          if (toggle?.contains(ev.target) === false) {
            setShow(false);
          }
        }
      }
    },
    [toggle, isNested, nestedToggle]
  );

  // attach click handlers
  useEffect(() => {
    document.addEventListener("click", closeDropdownHandler);
    return () => document.removeEventListener("click", closeDropdownHandler);
  }, [closeDropdownHandler]);
  //render component
  return (
    <div className="position-relative" {...menuContainerAttributes}>
      {anchor === "bottom-center" || anchor === "top-center" ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: anchor === "top-center" ? "0" : "auto",
          }}
        >
          <div
            className={clsx([
              classes.dropdownMenu,
              show && "d-block",
              className,
            ])}
            data-anchor={anchor}
            style={{ position: "relative", left: "-50%" }}
            {...menuAttributes}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          className={clsx([classes.dropdownMenu, show && "d-block", className])}
          data-anchor={anchor}
          {...menuAttributes}
        >
          {children}
        </div>
      )}
    </div>
  );
}
