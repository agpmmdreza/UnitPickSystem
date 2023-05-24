import { ISelectDefaultProps } from "components/core/multiSelect";
import FormMultiSelect from "components/form/formMultiSelect";
import { FormikProps } from "formik";
import { useAllDepartmentsOptions } from "hooks/useAlldepartmentsOptions";
import { useMultiSelectDefaultValue } from "hooks/useMultiSelecetDefaultValue";
import { getFormikFieldProps } from "utils/form";

export interface IAllDepartmentsProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<ISelectDefaultProps>;
  departmentFieldName: string;
  departmentIds?: string[];
  departmentNames?: string[];
  disabled?: boolean;
  label?: string;
}

//? Returns Full Department lists
export function AllDepartments<T extends { [key: string]: any }>({
  formik,
  rootProps,
  departmentFieldName,
  departmentIds,
  departmentNames,
  disabled,
  label,
}: IAllDepartmentsProps<T>) {
  const { OPTIONS, isError, isLoading } = useAllDepartmentsOptions();

  useMultiSelectDefaultValue({
    OPTIONS: OPTIONS,
    fieldName: departmentFieldName,
    formik: formik,
    ids: departmentIds,
    names: departmentNames,
  });

  return (
    <FormMultiSelect
      options={OPTIONS ? OPTIONS : []}
      rootProps={{
        placeholder: "Departments",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      {...getFormikFieldProps(
        departmentFieldName,
        label ? label : "Departments",
        formik
      )}
    />
  );
}
