import FormMultiSelect from "components/form/formMultiSelect";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {getFacilityDepartments} from "api/dropdown";
import {ISelectDefaultProps as IMultiSelectProps} from "components/core/multiSelect";
import {useMultiSelectDefaultValue} from "hooks/useMultiSelecetDefaultValue";

export interface IDepartmentsProps {
  departmentFieldName?: string;
  formik: any;
  hfNameFiled: string;
  disabled?: boolean;
  departmentIds?: string[];
  departmentNames?: string[];
  rootProps?: Partial<IMultiSelectProps>;
  noPadding?: boolean;
}

const Departments = ({
  formik,
  hfNameFiled,
  disabled,
  departmentFieldName = "departments",
  departmentIds,
  departmentNames,
  rootProps,
  noPadding,
}: IDepartmentsProps) => {
  //? Get Data from server side
  const { data } = useQuery(
    `facility-departments-${formik.values[hfNameFiled].value}`,
    () => {
      if (formik.values[hfNameFiled] && formik.values[hfNameFiled].key !== "") {
        return getFacilityDepartments(
          formik.values[hfNameFiled]?.length >= 0
            ? formik.values[hfNameFiled]?.map((x: any) => +x.key)
            : [formik.values[hfNameFiled]?.key]
        );
      }
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled:
        !!formik.values[hfNameFiled]?.value ||
        !!formik.values[hfNameFiled]?.length,
    }
  );

  //? Sets the shown options for dropdown
  const OPTIONS = data?.data.data?.map((item: any) => {
    return { key: item?.id + "", value: item?.name + "" };
  });

  useMultiSelectDefaultValue({
    OPTIONS: OPTIONS,
    fieldName: departmentFieldName,
    formik: formik,
    ids: departmentIds,
    names: departmentNames,
  });

  return (
    <FormMultiSelect
      noPadding={noPadding}
      options={!!OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(departmentFieldName, "Departments", formik)}
      rootProps={{
        placeholder: "Departments",
        disabled: disabled || !formik.values[hfNameFiled]?.value,
        ...rootProps,
      }}
    />
  );
};

export default Departments;
