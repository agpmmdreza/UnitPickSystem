import TimeInput, {ITimeInputProps} from "components/core/timeInput";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";
import classes from "./base/styles.module.scss";
import clsx from "clsx";

interface IFormTimeInputProps {
  rootProps?: Partial<ITimeInputProps>;
  noPadding?: boolean;
}

// form component for wrapping time input component
function FormTimeInput({
  onChange,
  value,
  rootProps,
  noPadding,
  ...props
}: IFormTimeInputProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement
      {...props}
      noPadding={noPadding}
      className={clsx([classes.formElementBaseContainer, props.className])}
    >
      <TimeInput
        defaultTime={value}
        name={props.nameId}
        onChange={(v) => onChange(v)}
        {...rootProps}
      />
    </FormBaseElement>
  );
}

export default FormTimeInput;
