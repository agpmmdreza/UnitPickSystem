import clsx from "clsx";
import {CheckLinear} from "components/icon";
import {HTMLProps} from "react";
import classes from "./styles.module.scss";

export interface ICheckboxProps {
  rootInput?: HTMLProps<HTMLInputElement>;
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

// checkbox component
function Checkbox({
  checked,
  onChange,
  disabled,
  readonly,
  className,
}: ICheckboxProps) {
  // render component
  return (
    <div
      data-testid="test-checkbox"
      className={clsx([
        classes.checkboxRoot,
        "d-flex flex-row align-items-center justify-content-center",
        className,
      ])}
      onClick={() => {
        if (!readonly) {
          onChange(!checked);
        }
      }}
      data-checked={checked}
      data-disabled={!!disabled}
    >
      {checked && <CheckLinear className={classes.icon} />}
    </div>
  );
}

Checkbox.defaultProps = {
  rootInput: {},
  onChange: () => {},
  readonly: false,
};

export default Checkbox;
