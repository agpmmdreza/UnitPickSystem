import { getBellsList } from "api/bells";
import { masterTimeList } from "api/timeTable";
import { IDefaultProps } from "components/core/autoComplete";
import FormAutoComplete from "components/form/formAutoComplete";
import { ManBold } from "components/icon";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  bellFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  timeTableId?: string;
  bellName?: string;
}

//? Gets the country and shows states in dropdown

export function MasterCourses<T extends { [key: string]: any }>({
  formik,
  bellFieldName,
  bellName,
  timeTableId,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [masterTimeList.name, "masterTimeTable"],
    () => masterTimeList({ page: 1, pageSize: 1000 })
  );

  const OPTIONS = data?.data?.data?.list.map((item) => ({
    key: item.id.toString(),
    value: item.course.title.toString(),
  }));

  useDropdownDefaultValue({
    fieldName: bellFieldName,
    formik: formik,
    id: timeTableId,
    OPTIONS: OPTIONS,
    name: bellName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(bellFieldName, value);
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
      {...getFormikFieldProps(
        bellFieldName,
        label ? label : "لیست دروس",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
