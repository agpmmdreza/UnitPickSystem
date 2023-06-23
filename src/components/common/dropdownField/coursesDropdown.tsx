import { GPSBold, ManBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { getCoursesList } from "api/courses";
import FormMultiSelect from "components/form/formMultiSelect";
import { ISelectDefaultProps } from "components/core/multiSelect";
import FormAutoComplete from "components/form/formAutoComplete";
import { IDefaultProps } from "components/core/autoComplete";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  courseFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  courseId?: string;
  courseName?: string;
}

//? Gets the country and shows states in dropdown

export function CoursesDropdown<T extends { [key: string]: any }>({
  formik,
  courseFieldName,
  courseName,
  courseId,
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

  useDropdownDefaultValue({
    fieldName: courseFieldName,
    formik: formik,
    id: courseId,
    OPTIONS: OPTIONS,
    name: courseName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(courseFieldName, value);
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
      {...getFormikFieldProps(courseFieldName, label ? label : "دروس", formik)}
      onChange={changeHandler}
    />
  );
}
