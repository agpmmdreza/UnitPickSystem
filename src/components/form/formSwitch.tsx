import Switch, {ISwitchProps} from "components/core/switch";
import FormBaseElement, {IBaseProps, IFormikFieldProps} from "./base";
import classes from "./base/styles.module.scss";
import clsx from "clsx";

interface IFormSwitchProps {
  rootProps?: Partial<ISwitchProps>;
}

// form component for wrapping switch input component
function FormSwitch({
  onChange,
  value,
  rootProps,
  ...props
}: IFormSwitchProps & IBaseProps & IFormikFieldProps) {
  // render component
  return (
    <FormBaseElement
      {...props}
      className={clsx([classes.formElementBaseContainer, props.className])}
    >
      <Switch checked={value} onChange={(v) => onChange(v)} {...rootProps} />
    </FormBaseElement>
  );
}

export default FormSwitch;
