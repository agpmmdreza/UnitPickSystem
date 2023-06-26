import NumberInput, { INumberInputProps } from "components/core/numberInput";
import FormBaseElement, { IBaseProps, IFormikFieldProps } from "./base";

interface IFormTimeInputProps {
  rootProps?: Partial<INumberInputProps>;
}

// form component for wrapping time input component
function FormNumberInput({
  onChange,
  value,
  rootProps,
  noPadding,
  label,
  ...props
}: IFormTimeInputProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement label={label} {...props} noPadding={noPadding}>
      <NumberInput
        value={value}
        name={props.nameId}
        onChange={(v) => onChange(v)}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormNumberInput;
