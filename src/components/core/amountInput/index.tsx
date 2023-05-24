import clsx from "clsx";
import {ErrorBold, SuccessBold, WarningBold} from "components/icon";
import classes from "./styles.module.scss";
import React, {HTMLProps} from "react";

export interface IAmountInputProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  icon?: any;
  size?: "small" | "normal" | "big";
  disabled?: boolean;
  htmlProps?: HTMLProps<HTMLInputElement>;
  validation?: "error" | "success" | "warning" | "none";
  type: string;
}

// simple base input component
const AmountInput = React.forwardRef<HTMLInputElement, IAmountInputProps>(
  (outProps, ref) => {
    const {
      name,
      value,
      onChange,
      onKeyDown,
      className,
      placeholder,
      icon: Icon,
      size,
      disabled,
      htmlProps,
      type,
      onBlur,
      ...props
    } = outProps;

    // render component
    return (
      <div
        className={clsx([classes.inputContainer, className])}
        data-variant={"textnumber"}
        data-validation={"validation" in props ? props.validation : "none"}
        data-size={size}
        data-disabled={disabled}
      >
        {Icon && (
          <div>
            <Icon className={classes.inputHeadIcon} />
          </div>
        )}

        <input
          name={name}
          value={value}
          className={classes.input}
          type={"number"}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          data-testid="test-input"
          disabled={disabled}
          onBlur={onBlur}
          {...htmlProps}
          ref={ref}
        />
        <div className={clsx(classes.type, disabled && classes.typeDisable)}>
          {type}
        </div>
        {"validation" in props && props.validation === "success" && (
          <SuccessBold className={classes.inputTailIcon} />
        )}
        {"validation" in props && props.validation === "error" && (
          <ErrorBold className={classes.inputTailIcon} />
        )}
        {"validation" in props && props.validation === "warning" && (
          <WarningBold className={classes.inputTailIcon} />
        )}
      </div>
    );
  }
);

AmountInput.defaultProps = {
  validation: "none",
  icon: undefined,
  onChange: () => {},
  onKeyDown: () => {},
  size: "big",
  disabled: false,
  htmlProps: {},
};

export default AmountInput;
