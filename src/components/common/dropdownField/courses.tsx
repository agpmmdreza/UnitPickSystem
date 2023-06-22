import { getSubSpecialities } from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import { GPSBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { useDropdownsOptions } from "hooks/useOptions";
import { getCoursesList } from "api/courses";
import FormMultiSelect from "components/form/formMultiSelect";
import { ISelectDefaultProps } from "components/core/multiSelect";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<ISelectDefaultProps>;
  courseFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  courseId?: string;
  courseName?: string;
}

//? Gets the country and shows states in dropdown

export function Courses<T extends { [key: string]: any }>({
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
    [getCoursesList.name, "courseDropdown"],
    () => getCoursesList({ page: 1 }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
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
    <FormMultiSelect
      noPadding={noPadding}
      rootProps={{
        icon: GPSBold,
        placeholder: "دروس",
        disabled: isError || isLoading || disabled,
        ...rootProps,
      }}
      options={OPTIONS || []}
      {...getFormikFieldProps(courseFieldName, label ? label : "دروس", formik)}
      onChange={changeHandler}
    />
  );
}
