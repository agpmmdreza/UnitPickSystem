import clsx from "clsx";
import classes from "./styles.module.scss";

// Ruler props type interface
export interface IRulerProps {
  color: "light" | "blue" | string;
  title: string;
  number: string;
  unit: string;
}

// component for create card with background of ruler
const Ruler = ({ color, title, number, unit }: IRulerProps) => {
  // render component
  return (
    <div
      className={clsx(classes.ruler)}
      style={{
        background:
          color === "light" ? "#FFEFDB" : color === "blue" ? "#47CBFF" : color,
      }}
    >
      <div className={clsx(classes.ruler__title)}>{title}</div>
      <div className={clsx(classes.ruler__numberPlace)}>
        <div>{`${number} ${unit}`}</div>
      </div>
    </div>
  );
};

export default Ruler;
