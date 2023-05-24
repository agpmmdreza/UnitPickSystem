import { FormikErrors, FormikHelpers } from "formik";

export interface IFormikProps<T extends { [key: string]: any }> {
  formikInitialValues: T;
  formikValidationSchema?: any;
  formikOnSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<any>;
  formikValidate?:
    | ((values: T) => void | object | Promise<FormikErrors<T>>)
    | undefined;
}
