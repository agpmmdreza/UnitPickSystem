import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { getDayList } from "api/days";
import FormAutoComplete from "components/form/formAutoComplete";
import { IDefaultProps } from "components/core/autoComplete";
import { StarIcon } from "@heroicons/react/24/outline";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  dayFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  dayId?: string;
  dayName?: string;
}

//? Gets the country and shows states in dropdown

export function Days<T extends { [key: string]: any }>({
  formik,
  dayFieldName,
  dayName,
  dayId,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getDayList.name, "dayList"],
    () => getDayList({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS = data?.data.data?.list.map((item) => ({
    key: item.id.toString(),
    value: item.label,
  }));

  useDropdownDefaultValue({
    fieldName: dayFieldName,
    formik: formik,
    id: dayId,
    OPTIONS: OPTIONS,
    name: dayName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(dayFieldName, value);
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: StarIcon,
        placeholder: label,
        disabled: isError || isLoading || disabled,
        ...rootProps,
      }}
      options={OPTIONS || []}
      {...getFormikFieldProps(dayFieldName, label ? label : "روز", formik)}
      onChange={changeHandler}
    />
  );
}
