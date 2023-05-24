import Password, {IPasswordProps} from "components/core/password";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";

interface IFormPasswordProps {
  rootProps?: Partial<IPasswordProps>;
}

// form component for wrapping password input component
function FormPassword({
  onChange,
  value,
  rootProps,
  ...props
}: IFormPasswordProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement {...props}>
      <Password
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validation={props.error ? "error" : "none"}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormPassword;
