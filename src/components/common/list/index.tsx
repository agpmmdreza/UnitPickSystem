import clsx from "clsx";
import {ReactNode} from "react";

/**
 * List component properties
 */
interface IListProps {
  children: ReactNode;
  className?: string;
}

/**
 * This is a parent (wrapper) component for ListItem
 */
const List = ({ children, className }: IListProps) => {
  return <div className={clsx(["row gy-2 gx-0", className])}>{children}</div>;
};

export default List;
