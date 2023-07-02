import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { getCoursesList } from "api/courses";
import FormMultiSelect from "components/form/formMultiSelect";
import { ISelectDefaultProps } from "components/core/multiSelect";
import { useMultiSelectDefaultValue } from "hooks/useMultiSelecetDefaultValue";
import { MapIcon } from "@heroicons/react/24/outline";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<ISelectDefaultProps>;
  courseFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  courseIds?: string[];
  courseNames?: string[];
}

//? Gets the country and shows states in dropdown

export function Courses<T extends { [key: string]: any }>({
  formik,
  courseFieldName,
  courseNames,
  courseIds,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getCoursesList.name, "courseList"],
    () => getCoursesList({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS = data?.data.data?.list.map((item) => ({
    key: item.id.toString(),
    value: item.title,
  }));

  useMultiSelectDefaultValue({
    fieldName: courseFieldName,
    formik: formik,
    OPTIONS: OPTIONS,
    ids: courseIds,
    names: courseNames,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(courseFieldName, value);
  };

  return (
    <FormMultiSelect
      noPadding={noPadding}
      rootProps={{
        icon: MapIcon,
        placeholder: label,
        disabled: isError || isLoading || disabled,
        ...rootProps,
      }}
      options={OPTIONS || []}
      {...getFormikFieldProps(courseFieldName, label ? label : "دروس", formik)}
      onChange={changeHandler}
    />
  );
}
