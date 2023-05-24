import clsx from "clsx";
import {CheckLinear} from "components/icon";
import {HTMLProps} from "react";
import classes from "./styles.module.scss";

export interface IFilterCheckboxProps {
  rootInput?: HTMLProps<HTMLInputElement>;
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
}

function FilterCheckbox({ checked, onChange, disabled }: IFilterCheckboxProps) {
  return (
    <div
      data-testid="test-checkbox"
      className={clsx([
        classes.checkboxRoot,
        "d-flex flex-row align-items-center justify-content-center",
      ])}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      data-checked={checked}
      data-disabled={!!disabled}
    >
      {checked && <CheckLinear className={classes.icon} />}
    </div>
  );
}

FilterCheckbox.defaultProps = {
  rootInput: {},
  onChange: () => {},
};

export default FilterCheckbox;
