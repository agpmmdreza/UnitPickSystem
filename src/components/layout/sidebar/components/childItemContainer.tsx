import clsx from "clsx";
import { useRef } from "react";
import { ISidebarItem } from "..";
import { ChildItem } from "./childItem";
import classes from "./styles.module.scss";

export interface IChildItemsContainerProps {
  item: ISidebarItem;
  collapse: boolean;
}

export function ChildItemsContainer({
  item,
  collapse,
}: IChildItemsContainerProps) {
  const refContainer = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={refContainer}
      className={clsx([classes.collapse])}
      style={{
        maxHeight: !collapse
          ? refContainer.current?.scrollHeight + "px"
          : "0px",
      }}
    >
      <div className={classes.collapse__container}>
        {item.child.map((child, index2) => {
          return <ChildItem key={index2} child={child} parentId={item.id} />;
        })}
      </div>
    </div>
  );
}
