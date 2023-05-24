import {FormikProps} from "formik";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {GENDER_OPTIONS} from "constants/autocompleteOptions";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {ManBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";

export interface IGenderProps<T> {
  formik: FormikProps<T>;
  genderFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  genderId?: string;
  genderName?: string;
  noPadding?: boolean;
}

//? sets gender in dropdown items

export function Gender<T extends { [key: string]: any }>({
  formik,
  genderFieldName,
  genderId,
  genderName,
  rootProps,
  noPadding,
}: IGenderProps<T>) {
  useDropdownDefaultValue({
    fieldName: genderFieldName,
    formik: formik,
    id: genderId,
    OPTIONS: GENDER_OPTIONS,
    name: genderName,
  });
  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{ icon: ManBold, placeholder: "Gender", ...rootProps }}
      options={GENDER_OPTIONS}
      {...getFormikFieldProps(genderFieldName, "Gender", formik)}
    />
  );
}
