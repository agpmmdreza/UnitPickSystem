import { forwardRef, HTMLAttributes } from "react";
import RDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "components/core/input";
import classes from "./styles.module.scss";

export interface IDatePickerProps extends HTMLAttributes<any> {
  value: Date | null;
  onDateSelect: (value: Date) => void;
  icon?: any;
  disabled?: boolean;
  readOnly?: boolean;
}

interface ICustomInputProps {
  value?: string;
  onClick?: () => void;
}

// custom date picker input component for picking date
const DatePicker = ({
  value,
  onDateSelect,
  icon,
  disabled,
  readOnly,
  ...rest
}: IDatePickerProps) => {
  // custom input for displaying as date picker
  const CustomInput = forwardRef<HTMLInputElement, ICustomInputProps>(
    ({ value, onClick }, ref) => (
      // add forDate props to have arrow down icon in base input component
      <Input
        disabled={!!disabled}
        type="text"
        htmlProps={{
          onFocus: () => {
            if (!!onClick && !readOnly) onClick();
          },
          readOnly: !!readOnly,
        }}
        icon={icon}
        value={value}
        ref={ref}
        forDate
        {...rest}
      />
    )
  );

  // render component
  return (
    <div className={classes.datePicker}>
      <RDatePicker
        selected={value}
        onChange={onDateSelect}
        customInput={<CustomInput />}
        scrollableYearDropdown
        showYearDropdown
        yearDropdownItemNumber={100}
        timeInputLabel="Time:"
        dateFormat="yyyy-MM-dd HH:mm:ss"
        showTimeInput
      />
    </div>
  );
};

export default DatePicker;
