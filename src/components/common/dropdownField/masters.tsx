import { ManBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { IDefaultProps } from "components/core/autoComplete";
import { getMasters } from "api/users";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  masterFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  masterId?: string;
  masterName?: string;
  role: string;
}

//? Gets the country and shows states in dropdown

export function Masters<T extends { [key: string]: any }>({
  formik,
  masterFieldName,
  masterName,
  masterId,
  rootProps,
  disabled,
  noPadding,
  label,
  role,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getMasters.name, "masterList"],
    () => getMasters({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS = data?.data.data?.map((item) => ({
    key: item.id.toString(),
    value: `${item.user.firstName} ${item.user.lastName}`,
  }));

  useDropdownDefaultValue({
    fieldName: masterFieldName,
    formik: formik,
    id: masterId,
    OPTIONS: OPTIONS,
    name: masterName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(masterFieldName, value);
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
      {...getFormikFieldProps(masterFieldName, label ? label : "دروس", formik)}
      onChange={changeHandler}
    />
  );
}
