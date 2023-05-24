import {FormikProps} from "formik";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {DOCTOR_TITLE_OPTIONS} from "constants/autocompleteOptions";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {TeacherBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";

export interface ITitleProps<T> {
  formik: FormikProps<T>;
  titleFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  titleId?: string;
  titleName?: string;
  noPadding?: boolean;
}

//? returns the title

export function Title<T extends { [key: string]: any }>({
  formik,
  titleFieldName,
  titleId,
  titleName,
  rootProps,
  noPadding,
}: ITitleProps<T>) {
  useDropdownDefaultValue({
    fieldName: titleFieldName,
    formik: formik,
    id: titleId,
    OPTIONS: DOCTOR_TITLE_OPTIONS,
    name: titleName,
  });
  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{ icon: TeacherBold, placeholder: "Degree", ...rootProps }}
      options={DOCTOR_TITLE_OPTIONS}
      {...getFormikFieldProps(titleFieldName, "Degree", formik)}
    />
  );
}
