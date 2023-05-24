import ChipInput from "components/core/chipInput";
import {IInputDefaultProps} from "components/core/input";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";

interface IFormChipInputProps {
  rootProps?: Partial<IInputDefaultProps>;
}

// form component for wrapping basic input component
function FormChipInput({
  onChange,
  value,
  rootProps,
  ...props
}: IFormChipInputProps & IBaseProps & IFormikFieldProps) {
  // render component

  return (
    <FormBaseElement {...props}>
      <ChipInput values={value} onChange={(newValues) => onChange(newValues)} />
      {/* <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validation={props.error && "error"}
        {...rootProps}
      /> */}
    </FormBaseElement>
  );
}

export default FormChipInput;
