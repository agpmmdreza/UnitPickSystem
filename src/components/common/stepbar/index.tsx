import {Dispatch, SetStateAction} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export interface IStepbarProps {
  items: string[];
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}

const Stepbar = ({ items, activePage, setActivePage }: IStepbarProps) => {
  return (
    <div className={clsx(classes.stepbar)}>
      {items.map((item, index) => {
        return (
          <div
            className={clsx(
              classes.stepbar__itemBack,
              index <= activePage && classes.stepbar__itemBackS,
              index === 0 && classes.stepbar__firstItem,
              index === items.length - 1 && classes.stepbar__lastItem
            )}
            key={index}
          >
            <div
              onClick={() => {
                if (index < activePage) {
                  setActivePage(index);
                }
              }}
              className={clsx(
                classes.stepbar__item,
                index === activePage && classes.stepbar__itemSelected,
                index < activePage && classes.stepbar__itemFinished,
                index === 0 && classes.stepbar__firstItem,
                index === items.length - 1 && classes.stepbar__lastItem
              )}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepbar;
