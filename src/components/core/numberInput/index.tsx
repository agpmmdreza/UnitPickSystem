import clsx from "clsx";
import {ArrowDownLinear} from "components/icon/arrowDown";

import classes from "./styles.module.scss";
import {HTMLProps} from "react";

export interface INumberInputProps {
  name: string;
  onChange: (v: number) => void;
  value?: number;
  size: "small" | "normal" | "big";
  min?: number;
  max?: number;
  htmlProps?: HTMLProps<HTMLDivElement>;
  icon?: any;
  readOnly?: boolean;
  disabled?: boolean;
}

// input component for input in time format
function NumberInput({
  name,
  onChange,
  value,
  size,
  min = 0,
  max = Infinity,
  htmlProps,
  icon: Icon,
  readOnly,
  disabled,
}: INumberInputProps) {
  const handleChange = (value: string) => {
    // setInputValue(value);
    if (readOnly) return;
    !isNaN(Number(value)) && onChange(+value);
  };

  const handleArrowChange = (valueToBeAdd: number) => {
    onChange((value || 0) + valueToBeAdd);
  };

  return (
    <div
      className={classes.numberRoot}
      data-size={size}
      data-disabled={disabled}
      data-testid="test-time"
      {...htmlProps}
    >
      {!!Icon && <Icon className={clsx(classes.inputHeadIcon)} />}
      <input
        data-disabled={disabled}
        disabled={disabled}
        name="numberInput"
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        className={classes.numberInput}
        data-testid="test-number-input"
      />

      {!readOnly && (
        <div className={classes.arrowsContainer}>
          <ArrowDownLinear
            className={clsx([classes.arrowUp, classes.arrow])}
            data-testid="test-arrow-up"
            onClick={() => value && value < max && handleArrowChange(+1)}
          />
          <ArrowDownLinear
            className={classes.arrow}
            data-disabled={value === 0}
            data-testid="test-arrow-down"
            onClick={() => value && value > min && handleArrowChange(-1)}
          />
        </div>
      )}
    </div>
  );
}

NumberInput.defaultProps = {
  size: "normal",
};

export default NumberInput;
