import { GPSBold, ManBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormMultiSelect from "components/form/formMultiSelect";
import { ISelectDefaultProps } from "components/core/multiSelect";
import { getBellsList } from "api/bells";
import { IDefaultProps } from "components/core/autoComplete";
import FormAutoComplete from "components/form/formAutoComplete";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  bellFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  bellId?: string;
  bellName?: string;
}

//? Gets the country and shows states in dropdown

export function Bells<T extends { [key: string]: any }>({
  formik,
  bellFieldName,
  bellName,
  bellId,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getBellsList.name, "bellList"],
    () => getBellsList({ page: 1 })
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
    fieldName: bellFieldName,
    formik: formik,
    id: bellId,
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
      {...getFormikFieldProps(bellFieldName, label ? label : "زنگ", formik)}
      onChange={changeHandler}
    />
  );
}
