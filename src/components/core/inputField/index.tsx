import {PropsWithChildren} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export interface IInputFieldProps extends PropsWithChildren<any> {
  title: string;
  className?: string;
}

const InputField = ({ className, children, title }: IInputFieldProps) => {
  return (
    <div className={clsx(classes.field, className)}>
      <h6 className={clsx(classes.field__title)}>{title}</h6>
      {children}
    </div>
  );
};

export default InputField;
