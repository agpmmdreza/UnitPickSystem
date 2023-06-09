import Textarea, {ITextAreaDefaultProps} from "components/core/textarea";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";

interface IFormInputProps {
  rootProps?: Partial<ITextAreaDefaultProps>;
}

// form component for wrapping text area input
function FormTextarea({
  onChange,
  value,
  rootProps,
  ...props
}: IFormInputProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement {...props}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validation={props.error && "error"}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormTextarea;
