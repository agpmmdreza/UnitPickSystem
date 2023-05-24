import clsx from "clsx";
import {cloneElement, useEffect, useRef, useState} from "react";

import classes from "./styles.module.scss";

interface IMenuProps {
  children: JSX.Element[] | JSX.Element;
  onSelect: (id: string) => void;
  anchorId: string;
  open: boolean;
  padding: number;
  width?: number;
  className?: string;
  addAdditionalProps: boolean;
}

interface TopPositioned {
  // top: string;
  // left: string;
  // maxHeight: string;
  width: string;
}

interface BottomPositioned {
  // bottom: string;
  // left: string;
  // maxHeight: string;
  width: string;
}

const DEFAULT_STATE: {
  display: boolean;
  position: TopPositioned | BottomPositioned;
} = {
  display: false,
  position: {
    width: "0",
  },
};
// convert number to pixel
const numToPX = (num: number) => `${num}px`;

// menu component
function Menu({
  onSelect,
  children,
  anchorId,
  open,
  padding: menuPadding,
  width: menuWidth,
  className,
  addAdditionalProps,
}: IMenuProps) {
  const [innerChildren, setInnerChildren] = useState<
    JSX.Element[] | JSX.Element
  >();
  const [state, setState] = useState(DEFAULT_STATE);
  let menu = useRef<null | HTMLDivElement>();
  let menuParrent = useRef<null | HTMLDivElement>();

  // adjusting menu component absolute position
  useEffect(() => {
    setState((prev) => {
      let anchor = document.getElementById(anchorId);
      if (!!anchor) {
        let boundaries = anchor.getBoundingClientRect();
        let scrollTop = document.documentElement.scrollTop;
        return {
          ...prev,
          position: {
            width: menuWidth ? numToPX(menuWidth) : numToPX(boundaries.width),
            top: numToPX(
              boundaries.top + scrollTop + boundaries.height + menuPadding
            ),
            left: numToPX(boundaries.left),
          },
        };
      } else {
        return DEFAULT_STATE;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorId, menuWidth]);

  // add children to menu
  useEffect(() => {
    let newChildren: JSX.Element[] = [];
    if (addAdditionalProps) {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          newChildren.push(
            cloneElement(child, {
              ...child.props,
              onClick: () => {
                onSelect(child.props.id);
              },
            })
          );
        });
      } else {
        newChildren.push(children);
      }
    }

    setInnerChildren(newChildren);
  }, [children, onSelect, addAdditionalProps]);
  // render component
  return (
    <div
      ref={(ref) => (menuParrent.current = ref)}
      style={{ zIndex: open ? 999999 : -1 }}
    >
      <div
        ref={(ref) => (menu.current = ref)}
        style={{
          ...state.position,
        }}
        className={clsx([classes.menu, className])}
        data-open={open}
      >
        {innerChildren}
      </div>
    </div>
  );
}

Menu.defaultProps = {
  padding: 5,
  addAdditionalProps: false,
};

export default Menu;
