import { ManBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { IMenuOption } from "components/form/formMultiSelect";
import FormAutoComplete from "components/form/formAutoComplete";
import { IDefaultProps } from "components/core/autoComplete";
import { getTimeTablesList } from "api/timeTable";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  timeTableFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  timeTableId?: string;
  timeTableName?: string;
}

//? Gets the country and shows states in dropdown

export function TimeTables<T extends { [key: string]: any }>({
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
    [getTimeTablesList.name],
    () => getTimeTablesList({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS: IMenuOption[] =
    data?.data.data?.list.map((item) => {
      const bells = item.timeTableBellList
        .map(
          (i) =>
            `(${i.day.label} - ${i.bell.label}) - کلاس ${i.roomNumber} - هفته ${i.weekType}`
        )
        .join(" --- ");

      return {
        key: item.id.toString(),
        value: `${item.course.title} - ${item.master.user.firstName} ${item.master.user.lastName} ${bells}`,
      };
    }) || [];

  // data?.data.data?.list.forEach((item) => {
  //   const allBells = item.timeTableBellList.map((ttb) => ({
  //     key: item.id.toString(),
  //     value: `${item.course.title} - ${item.master.user.firstName} ${item.master.user.lastName} - (${ttb.day.label} - ${ttb.bell.label}) - کلاس ${ttb.roomNumber} - هفته ${ttb.weekType}`,
  //   }));
  //   OPTIONS.push(...allBells);
  // });

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
        timeTableFieldName,
        label ? label : "دروس",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
