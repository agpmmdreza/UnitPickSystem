import FormAutoComplete from "components/form/formAutoComplete";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {getRelationshipTypes} from "api/dropdown";
import {useQuery} from "react-query";
import {useDropdownsOptions} from "hooks/useOptions";
import {FamilyBold} from "components/icon/familyBold";

export interface IRelationshipProps<T> {
  formik: FormikProps<T>;
  fieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  typeId?: string;
  typeName?: string;
}

//? shows robot types in dropdown

export function Relationship<T extends { [key: string]: any }>({
  formik,

  fieldName,
  rootProps,
  typeId,
  typeName,
}: IRelationshipProps<T>) {
  const { data, isError, isLoading } = useQuery(
    "getRelationships",
    getRelationshipTypes,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const OPTIONS = useDropdownsOptions({ data });

  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: typeId,
    OPTIONS: OPTIONS,
    name: typeName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: FamilyBold,
        placeholder: "Relationship",
        disabled: isError || isLoading,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, "Relationship", formik)}
      onChange={changeHandler}
    />
  );
}
