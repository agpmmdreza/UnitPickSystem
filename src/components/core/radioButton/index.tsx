import {generateUUIDv4} from "../../../utils/uuid";
import clsx from "clsx";
import classes from "./styles.module.scss";

// RadioButton props type interface
export interface IRadioButtonProps {
  title: string;
  isSelected?: boolean;
  clickable?: boolean;
  titleToRight?: boolean;
  name?: string;
  onChange: (checked: boolean) => any;
}

// RadioButton Component (custom radio component based on html radio input)
const RadioButton = ({
  title,
  isSelected,
  clickable,
  titleToRight,
  name,
  onChange,
}: IRadioButtonProps) => {
  // random id for input and it label
  const id = "id_" + generateUUIDv4();
  //render component
  return (
    <div className={clsx(classes.radio)}>
      <input
        type={"checkbox"}
        id={id}
        name={name}
        className={clsx(classes.radio__input)}
        checked={isSelected}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (clickable) onChange(e.target.checked);
        }}
        onClick={() => {
          if (clickable) onChange(!isSelected);
        }}
      />
      <label htmlFor={id}>
        <div className={classes.radio__container}>
          {!titleToRight && (
            <div className={clsx(classes.radio__text)}>{title}</div>
          )}
          <div className={clsx(classes.radio__circle)}>
            <div className={clsx(classes.select)}></div>
          </div>
          {titleToRight && (
            <div className={clsx(classes.radio__text)}>{title}</div>
          )}
        </div>
      </label>
    </div>
  );
};

// component default props
RadioButton.defaultProps = {
  isSelected: false,
  clickable: true,
  titleToRight: false,
  onChange: () => {},
};

export default RadioButton;
