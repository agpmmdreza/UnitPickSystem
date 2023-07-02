import MultiSelect, {
  ISelectDefaultProps as IMultiSelectProps,
} from "components/core/multiSelect";
import { IMenuOption } from "interfaces";
import FormBaseElement, { IBaseProps, IFormikFieldProps } from "./base";

interface IFormAutoCompleteProps {
  options: IMenuOption[];
  rootProps?: Partial<IMultiSelectProps>;
}

// form component for wrapping multi select input component
function FormMultiSelect({
  onChange,
  value,
  options,
  rootProps,
  ...props
}: IFormAutoCompleteProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    // provide input for department selection
    // add icon and placeholder of department
    <FormBaseElement {...props}>
      <MultiSelect
        options={options}
        value={value}
        onItemSelect={(v) => onChange(v)}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export { type IMenuOption };
export default FormMultiSelect;
