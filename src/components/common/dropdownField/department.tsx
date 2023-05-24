import {FormikProps} from "formik";
import {IDefaultProps as IAutoCompleteProps, IMenuOption,} from "components/core/autoComplete";
import {getFormikFieldProps} from "utils/form";
import FormAutoComplete from "components/form/formAutoComplete";
import {HospitalBold} from "components/icon";
import {useQuery} from "react-query";
import {getFacilitiesDepartments} from "api/dropdown";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface IDepartmentProps<T> {
  formik: FormikProps<T>;
  departmentFieldName: string;
  hfNameFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  departmentId?: string;
  departmentName?: string;
  disabled?: boolean;
  label?: string;
  robotIDFieldName?: string;
}

export function Department<T extends { [key: string]: any }>({
  departmentFieldName,
  formik,
  hfNameFieldName,
  rootProps,
  departmentId,
  departmentName,
  disabled,
  label,
  robotIDFieldName,
}: IDepartmentProps<T>) {
  //? Get Data from server side
  const { data, isLoading, isError } = useQuery(
    ["getFacilitiesDepartments", formik.values[hfNameFieldName]?.key],

    () =>
      getFacilitiesDepartments({
        facilities_ids: [Number(formik.values[hfNameFieldName]?.key)],
      }),
    { enabled: !!formik.values[hfNameFieldName]?.key }
  );
  //? Sets the shown options for dropdown
  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: departmentFieldName,
    formik: formik,
    id: departmentId,
    OPTIONS: OPTIONS,
    name: departmentName,
  });

  //? Function to update changes on server side
  const changeHandler = (value: IMenuOption) => {
    formik.setFieldValue(departmentFieldName, value);
    if (value.key !== "") {
      formik.setFieldError(departmentFieldName, undefined);
    }
    if (robotIDFieldName) {
      formik.setFieldValue(robotIDFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: HospitalBold,
        placeholder: "Department",
        disabled:
          !formik.values[hfNameFieldName] ||
          !formik.values[hfNameFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(
        departmentFieldName,
        label ? label : "Department",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
