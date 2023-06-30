import { FormikProps } from "formik";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import { GENDER_OPTIONS } from "constants/autocompleteOptions";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { ManBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";

export interface IGenderProps<T> {
  formik: FormikProps<T>;
  termFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  termId?: string;
  termName?: string;
  noPadding?: boolean;
}

export const TERM_OPTIONS = [
  { key: "1397_1", value: "1397_1" },
  { key: "1397_2", value: "1397_2" },
  { key: "1398_1", value: "1398_1" },
  { key: "1398_2", value: "1398_2" },
  { key: "1399_1", value: "1399_1" },
  { key: "1399_2", value: "1399_2" },
  { key: "1400_1", value: "1400_1" },
  { key: "1400_2", value: "1400_2" },
  { key: "1401_1", value: "1401_1" },
  { key: "1401_2", value: "1401_2" },
  { key: "1402_1", value: "1402_1" },
  { key: "1402_2", value: "1402_2" },
];

//? sets term in dropdown items

export function Terms<T extends { [key: string]: any }>({
  formik,
  termFieldName,
  termId,
  termName,
  rootProps,
  noPadding,
}: IGenderProps<T>) {
  useDropdownDefaultValue({
    fieldName: termFieldName,
    formik: formik,
    id: termId,
    OPTIONS: GENDER_OPTIONS,
    name: termName,
  });
  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{ icon: ManBold, placeholder: "ترم", ...rootProps }}
      options={TERM_OPTIONS}
      {...getFormikFieldProps(termFieldName, "ترم", formik)}
    />
  );
}
