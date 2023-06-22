import { FormikProps } from "formik";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import { WEEK_TYPE_OPTIONS } from "constants/autocompleteOptions";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { ManBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";

export interface IWeekTypeProps<T> {
  formik: FormikProps<T>;
  fieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  weekTypeId?: string;
  weekTypeName?: string;
  noPadding?: boolean;
}

//? sets gender in dropdown items

export function WeekType<T extends { [key: string]: any }>({
  formik,
  fieldName,
  weekTypeId,
  weekTypeName,
  rootProps,
  noPadding,
}: IWeekTypeProps<T>) {
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: weekTypeId,
    OPTIONS: WEEK_TYPE_OPTIONS,
    name: weekTypeName,
  });
  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{ icon: ManBold, placeholder: "نوع هفته", ...rootProps }}
      options={WEEK_TYPE_OPTIONS}
      {...getFormikFieldProps(fieldName, "نوع هفته", formik)}
    />
  );
}
