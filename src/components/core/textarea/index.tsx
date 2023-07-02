import clsx from "clsx";
import classes from "./styles.module.scss";
import React, { HTMLProps } from "react";

export interface ITextAreaDefaultProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  icon?: any;
  disabled?: boolean;
  validation?: "error" | "success" | "warning" | "none";
  rows?: number;
  htmlProps?: HTMLProps<HTMLTextAreaElement>;
}

// custom text area input component for multi line text input
const Textarea = React.forwardRef<HTMLTextAreaElement, ITextAreaDefaultProps>(
  (outProps, ref) => {
    const {
      name,
      value,
      onChange,
      className,
      placeholder,
      icon: Icon,
      disabled,
      rows,
      htmlProps,
      ...props
    } = outProps;
    // render component
    return (
      <div
        className={clsx([classes.inputContainer, className])}
        data-validation={"validation" in props ? props.validation : "none"}
        data-disabled={disabled}
      >
        {Icon && <Icon className={classes.inputHeadIcon} />}
        <textarea
          name={name}
          value={value}
          className={classes.input}
          placeholder={placeholder}
          onChange={onChange}
          data-testid="test-textarea"
          disabled={disabled}
          rows={rows}
          {...htmlProps}
          ref={ref}
        />
      </div>
    );
  }
);

Textarea.defaultProps = {
  validation: "none",
  icon: undefined,
  onChange: () => {},
  rows: 3,
};

export default Textarea;
