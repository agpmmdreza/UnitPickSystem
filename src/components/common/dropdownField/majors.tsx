import { GPSBold, ManBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormMultiSelect from "components/form/formMultiSelect";
import { ISelectDefaultProps } from "components/core/multiSelect";
import FormAutoComplete from "components/form/formAutoComplete";
import { IDefaultProps } from "components/core/autoComplete";
import { getMajorList } from "api/majors";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  majorFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  majorId?: string;
  majorName?: string;
}

//? Gets the country and shows states in dropdown

export function Majors<T extends { [key: string]: any }>({
  formik,
  majorFieldName,
  majorName,
  majorId,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getMajorList.name, "majorList"],
    () => getMajorList({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS = data?.data.data?.list.map((item) => ({
    key: item.id.toString(),
    value: item.majorName,
  }));

  useDropdownDefaultValue({
    fieldName: majorFieldName,
    formik: formik,
    id: majorId,
    OPTIONS: OPTIONS,
    name: majorName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(majorFieldName, value);
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: ManBold,
        placeholder: label,
        disabled: isError || isLoading || disabled,
        ...rootProps,
      }}
      options={OPTIONS || []}
      {...getFormikFieldProps(majorFieldName, label ? label : "رشته", formik)}
      onChange={changeHandler}
    />
  );
}
