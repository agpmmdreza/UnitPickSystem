import FormBaseElement, { IBaseProps, IFormikFieldProps } from "./base";
import DatePicker, { IDatePickerProps } from "components/core/datePicker";

// form component for warping date picker input
function FormInput({
  onChange,
  value,
  ...props
}: IBaseProps & IFormikFieldProps & IDatePickerProps) {
  // render component
  return (
    <FormBaseElement {...props}>
      <DatePicker {...props} value={value} onDateSelect={(v) => onChange(v)} />
    </FormBaseElement>
  );
}

FormInput.defaultProps = {
  onDateSelect: () => {},
};

export default FormInput;
