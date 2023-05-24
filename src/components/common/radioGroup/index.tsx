import clsx from "clsx";
import classes from "./styles.module.scss";

// RadioGroup component props type interface
export interface IRadioGroupProps {
  items: string[];
  selectedIndex?: number;
  onChange: (selectedIndex: number) => any;
}

// RadioGroup component that display RadioInputs that can select only one of them
const RadioGroup = ({ items, selectedIndex, onChange }: IRadioGroupProps) => {
  return (
    <>
      {items.map((item, i) => {
        return (
          <div
            className={clsx(classes.radioGroup)}
            key={i}
            onClick={() => onChange(i)}
          >
            <div
              className={clsx(
                classes.radioGroup__circle,
                classes.radioGroup__center
              )}
            >
              <div
                className={clsx(
                  classes.radioGroup__inside,
                  selectedIndex === i && classes.radioGroup__selected
                )}
              ></div>
            </div>
            <div className={clsx(classes.radioGroup__center)}>{item}</div>
          </div>
        );
      })}
    </>
  );
};

export default RadioGroup;
