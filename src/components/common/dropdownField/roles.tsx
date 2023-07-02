import { FormikProps } from "formik";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import { ROLES_OPTIONS } from "constants/autocompleteOptions";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { getFormikFieldProps } from "utils/form";

export interface IRolesProps<T> {
  formik: FormikProps<T>;
  fieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  roleId?: string;
  roleName?: string;
  noPadding?: boolean;
}

//? sets gender in dropdown items

export function Roles<T extends { [key: string]: any }>({
  formik,
  fieldName,
  roleId,
  roleName,
  rootProps,
  noPadding,
}: IRolesProps<T>) {
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: roleId,
    OPTIONS: ROLES_OPTIONS,
    name: roleName,
  });
  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{ placeholder: "نقش", ...rootProps }}
      options={ROLES_OPTIONS}
      {...getFormikFieldProps(fieldName, "نقش", formik)}
    />
  );
}
