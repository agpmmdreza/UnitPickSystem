import {getCountries} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {GPSBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface ICountryProps<T> {
  formik: FormikProps<T>;
  countryFieldName: keyof T & string;
  stateFieldName?: keyof T & string;
  timezoneFieldName?: keyof T & string;
  rootProps?: Partial<IAutoCompleteProps>;
  countryId?: string;
  countryName?: string;
  disabled?: boolean;
  label?: string;
  noPadding?: boolean;
}

export function Country<T extends { [key: string]: any }>({
  countryFieldName,
  formik,
  stateFieldName,
  rootProps,
  countryId,
  countryName,
  disabled,
  timezoneFieldName,
  label,
  noPadding,
}: ICountryProps<T>) {
  //? Caches The Data received from server
  const { data, isLoading, isError } = useQuery("getCountries", getCountries, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  //? Sets Options for dropdown
  const OPTIONS = useDropdownsOptions({ data: data });

  //? Configures for onload dropdown values
  useDropdownDefaultValue({
    fieldName: countryFieldName,
    formik: formik,
    id: countryId,
    OPTIONS: OPTIONS,
    name: countryName,
  });

  //? Handles the data change on server
  const changeHandler = (value: any) => {
    formik.setFieldValue(countryFieldName, value);
    if (stateFieldName) {
      formik.setFieldValue(stateFieldName, { key: "", value: "" });
    }
    if (timezoneFieldName) {
      formik.setFieldValue(timezoneFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: GPSBold,
        placeholder: "Country",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(
        countryFieldName,
        label ? label : "Country",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
