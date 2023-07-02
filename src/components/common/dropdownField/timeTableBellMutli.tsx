import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormMultiSelect from "components/form/formMultiSelect";
import { ISelectDefaultProps } from "components/core/multiSelect";
import { getTimeTableBellsList } from "api/timeTableBells";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<ISelectDefaultProps>;
  timeTableFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  timeTableId?: string;
  timeTableName?: string;
}

//? Gets the country and shows states in dropdown

export function TimeTableBellMultiSelect<T extends { [key: string]: any }>({
  formik,
  timeTableFieldName,
  timeTableName,
  timeTableId,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getTimeTableBellsList.name],
    () => getTimeTableBellsList({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS = data?.data.data?.list.map((item) => ({
    key: item.id.toString(),
    value: `${item.day.label} (${item.bell.label})`,
  }));

  useDropdownDefaultValue({
    fieldName: timeTableFieldName,
    formik: formik,
    id: timeTableId,
    OPTIONS: OPTIONS,
    name: timeTableName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(timeTableFieldName, value);
  };

  return (
    <FormMultiSelect
      noPadding={noPadding}
      rootProps={{
        placeholder: label,
        disabled: isError || isLoading || disabled,
        ...rootProps,
      }}
      options={OPTIONS || []}
      {...getFormikFieldProps(
        timeTableFieldName,
        label ? label : "دروس",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
