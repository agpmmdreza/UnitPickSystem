import Checkbox, {ICheckboxProps} from "components/core/checkbox";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";
import classes from "./base/styles.module.scss";
import clsx from "clsx";

interface IFormCheckboxProps {
  rootProps?: Partial<ICheckboxProps>;
}
// form component for wrapping checkbox input component
function FormCheckbox({
  onChange,
  value,
  rootProps,
  ...props
}: IFormCheckboxProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement
      {...props}
      className={clsx([classes.formElementBaseContainer, props.className])}
    >
      <Checkbox checked={value} onChange={(v) => onChange(v)} {...rootProps} />
    </FormBaseElement>
  );
}

export default FormCheckbox;
