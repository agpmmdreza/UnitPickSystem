import clsx from "clsx";
import {CloseLinear} from "components/icon";
import classes from "./styles.module.scss";
import React, {HTMLProps, useMemo, useState} from "react";
import Chip from "../chip";

export interface IInputDefaultProps {
  name?: string;
  values?: string[];
  onChange?: (value: any) => void;
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
}

// simple base input component
const ChipInput = React.forwardRef<HTMLInputElement, IInputDefaultProps>(
  (outProps, ref) => {
    const {
      name,
      values,
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
      ...props
    } = outProps;
    // gray-very-light
    const [inputValue, setInputValue] = useState("");
    const randColor = useMemo(() => {
      return "000000".replace(/0/g, function () {
        return (~~(Math.random() * 13)).toString(13);
      });
    }, []);

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const isExist = values?.some((value) => value === inputValue);
      if (e.key === "Enter" && inputValue.trim() && !isExist) {
        onChange?.([...(values ? [...values] : []), inputValue]);
        setInputValue("");
      }
    };
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
        <div className={classes.input__chipContainer}>
          {values?.map((valueItem) => (
            <div key={Math.random()}>
              <Chip
                text={valueItem}
                icon={
                  <span
                    onClick={() =>
                      onChange?.(values.filter((item) => item !== valueItem))
                    }
                  >
                    <CloseLinear />
                  </span>
                }
                color={`#${randColor}`}
              />
            </div>
          ))}
          <input
            name={name}
            value={inputValue}
            className={clsx(classes.input)}
            type={type}
            placeholder={placeholder}
            onChange={onChangeInputValue}
            onKeyDown={onPressEnter}
            data-testid="test-input"
            disabled={disabled}
            {...(values && values?.length > 0 && { size: 2 })}
            {...htmlProps}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

ChipInput.defaultProps = {
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

export default ChipInput;
