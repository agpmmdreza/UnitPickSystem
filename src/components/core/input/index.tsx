import clsx from "clsx";
import {ArrowDownBold, ErrorBold, SearchLinear, SuccessBold, WarningBold,} from "components/icon";
import classes from "./styles.module.scss";
import React, {HTMLProps} from "react";

export interface IInputDefaultProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  icon?: any;
  size?: "small" | "normal" | "big";
  disabled?: boolean;
  htmlProps?: HTMLProps<HTMLInputElement>;
  type?: "text" | "number" | "search";
  validation?: "error" | "success" | "warning" | "none";
  searchColor?: "white" | "transparent";
  forDate?: boolean;
  readonly?: boolean;
}

// simple base input component
const Input = React.forwardRef<HTMLInputElement, IInputDefaultProps>(
  (outProps, ref) => {
    const {
      name,
      value,
      onChange,
      onKeyDown,
      type,
      searchColor: color,
      className,
      placeholder,
      icon: Icon,
      size,
      disabled,
      htmlProps,
      forDate,
      readonly,
      ...props
    } = outProps;
    // gray-very-light
    // render component
    return (
      <div
        className={clsx([classes.inputContainer, className])}
        data-variant={type === "search" ? "search" : "textnumber"}
        data-validation={"validation" in props ? props.validation : "none"}
        data-size={size}
        data-disabled={disabled}
        data-color={color}
      >
        {type !== "search" && Icon && (
          <Icon className={classes.inputHeadIcon} />
        )}
        {type === "search" && (
          <div className="d-inline-flex align-items-center">
            <SearchLinear className={classes.inputHeadIcon} />
          </div>
        )}
        <input
          name={name}
          value={value}
          className={classes.input}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          data-testid="test-input"
          disabled={disabled}
          readOnly={readonly}
          {...htmlProps}
          ref={ref}
        />
        {type !== "search" &&
          "validation" in props &&
          props.validation === "success" && (
            <SuccessBold className={classes.inputTailIcon} />
          )}
        {type !== "search" &&
          "validation" in props &&
          props.validation === "error" && (
            <ErrorBold className={classes.inputTailIcon} />
          )}
        {type !== "search" &&
          "validation" in props &&
          props.validation === "warning" && (
            <WarningBold className={classes.inputTailIcon} />
          )}
        {forDate ? (
          <ArrowDownBold
            className={clsx([
              classes.inputTailIcon,
              /*    isMenuOpen ? classes.rotate : "",*/
            ])}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
);

Input.defaultProps = {
  type: "text",
  validation: "none",
  icon: undefined,
  onChange: () => {},
  onKeyDown: () => {},
  size: "big",
  disabled: false,
  htmlProps: {},
  searchColor: "white",
};

export default Input;
