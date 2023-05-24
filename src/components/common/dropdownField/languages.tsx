import FormAutoComplete from "components/form/formAutoComplete";
import {getFormikFieldProps} from "utils/form";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {getLanguage} from "api/dropdown";
import {useQuery} from "react-query";
import {useDropdownsOptions} from "hooks/useOptions";
import {MessagesBold} from "components/icon";
import {IDropdown} from "./IDropdown";

export interface ILanguagesProps<T> extends IDropdown<T> {
  langId?: string;
  langName?: string;
  fieldLabel?: string;
}

//? shows robot types in dropdown

export function Languages<T extends { [key: string]: any }>({
  formik,
  fieldName,
  rootProps,
  langId,
  langName,
  fieldLabel = "Language",
  noPadding,
}: ILanguagesProps<T>) {
  const {
    data: langData,
    isError,
    isLoading,
  } = useQuery("getLanguages", getLanguage, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({
    data: langData && {
      ...langData,
      data: {
        ...langData.data,
        data: langData?.data.data?.map((item) => ({
          id: item.id.code,
          name: item.name.name,
        })),
      },
    },
  });

  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: langId,
    OPTIONS: OPTIONS,
    name: langName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <FormAutoComplete
      noPadding
      rootProps={{
        icon: MessagesBold,
        placeholder: "Language",
        disabled: isError || isLoading,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, fieldLabel, formik)}
      onChange={changeHandler}
    />
  );
}
