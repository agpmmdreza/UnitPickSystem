import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { IDefaultProps } from "components/core/autoComplete";
import { getUserList } from "api/users";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IDefaultProps>;
  userFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  userId?: string;
  userName?: string;
  role: string;
}

//? Gets the country and shows states in dropdown

export function UsersByRole<T extends { [key: string]: any }>({
  formik,
  userFieldName,
  userName,
  userId,
  rootProps,
  disabled,
  noPadding,
  label,
  role,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getUserList.name, "userList"],
    () => getUserList({ page: 1 })
    // {
    //   staleTime: Infinity,
    //   cacheTime: Infinity,
    // }
  );

  const OPTIONS = data?.data.data?.list
    .filter((user) => user.role.toLowerCase() === role)
    .map((item) => ({
      key: item.id.toString(),
      value: `${item.firstName} ${item.lastName}`,
    }));

  useDropdownDefaultValue({
    fieldName: userFieldName,
    formik: formik,
    id: userId,
    OPTIONS: OPTIONS,
    name: userName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(userFieldName, value);
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        placeholder: label,
        disabled: isError || isLoading || disabled,
        ...rootProps,
      }}
      options={OPTIONS || []}
      {...getFormikFieldProps(userFieldName, label ? label : "دروس", formik)}
      onChange={changeHandler}
    />
  );
}
