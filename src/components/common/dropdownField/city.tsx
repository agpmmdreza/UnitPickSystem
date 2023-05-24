import {getCities} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {GPSBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface ICityProps<T> {
  formik: FormikProps<T>;
  stateFieldName: keyof T & string;
  cityFieldName: keyof T & string;
  hfNameFieldName?: keyof T & string;
  doctorNameFieldName?: keyof T & string;
  specialityFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  cityId?: string;
  cityName?: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
}

export function City<T extends { [key: string]: any }>({
  formik,
  cityFieldName,
  stateFieldName,
  hfNameFieldName,
  doctorNameFieldName,
  specialityFieldName,
  rootProps,
  cityId,
  cityName,
  disabled,
  noPadding,
  label,
}: ICityProps<T>) {
  //? Get City Data from server including state name,health facility name,
  const { data, isLoading, isError } = useQuery(
    ["getCities", formik.values[stateFieldName]?.key],

    () => getCities(Number(formik.values[stateFieldName]?.key)),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!formik.values[stateFieldName]?.key,
    }
  );
  //? Set options for drop down
  const OPTIONS = useDropdownsOptions({ data: data });

  useDropdownDefaultValue({
    fieldName: cityFieldName,
    formik: formik,
    id: cityId,
    OPTIONS: OPTIONS,
    name: cityName,
  });

  //? Function For changing fields data on server side
  const changeHandler = (value: any) => {
    formik.setFieldValue(cityFieldName, value);
    if (hfNameFieldName) {
      if (Array.isArray(formik.values[hfNameFieldName])) {
        formik.setFieldValue(hfNameFieldName, []);
      } else {
        formik.setFieldValue(hfNameFieldName, { key: "", value: "" });
      }
    }
    if (doctorNameFieldName) {
      formik.setFieldValue(doctorNameFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: GPSBold,
        placeholder: "City",
        disabled:
          !formik.values[stateFieldName] ||
          !formik.values[stateFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(cityFieldName, label ? label : "City", formik)}
      onChange={changeHandler}
    />
  );
}
