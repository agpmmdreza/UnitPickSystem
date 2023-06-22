import clsx from "clsx";
import classes from "./styles.module.scss";

export type StepNumber = 1 | 2 | 3 | 4 | 5;

export interface ILoginLayoutProps extends React.PropsWithChildren<any> {
  hasFooter?: boolean;
  form_title: string;
  form_description: string;
  stepsCount?: number;
  step?: 1 | 2 | 3 | 4 | 5;
  onSetStep?: (step: StepNumber) => void;
}

export default function LoginLayout({
  children,
  hasFooter,
  form_title,
  form_description,
}: ILoginLayoutProps) {
  return (
    <div className={clsx([classes.loginContainer])}>
      <div className={classes.formSection}>
        <div className={classes.form_container}>
          <div className={classes.form_title}>{form_title}</div>
          <div className={classes.form_description}>{form_description}</div>
          <div className={classes.form_formContainer}>{children}</div>
        </div>
      </div>
    </div>
  );
}
