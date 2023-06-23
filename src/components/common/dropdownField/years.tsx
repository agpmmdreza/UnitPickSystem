import { FormikProps } from "formik";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import {
  WEEK_TYPE_OPTIONS,
  YEARS_OPTIONS,
} from "constants/autocompleteOptions";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { ManBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";

export interface IYearsProps<T> {
  formik: FormikProps<T>;
  fieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  yearsId?: string;
  yearsName?: string;
  noPadding?: boolean;
}

//? sets gender in dropdown items

export function Years<T extends { [key: string]: any }>({
  formik,
  fieldName,
  yearsId,
  yearsName,
  rootProps,
  noPadding,
}: IYearsProps<T>) {
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: yearsId,
    OPTIONS: WEEK_TYPE_OPTIONS,
    name: yearsName,
  });
  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{ icon: ManBold, placeholder: "سال ورود", ...rootProps }}
      options={YEARS_OPTIONS}
      {...getFormikFieldProps(fieldName, "سال ورود", formik)}
    />
  );
}
