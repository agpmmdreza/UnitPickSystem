import {getStates} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {GPSBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";
import {useEffect} from "react";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  stateFieldName: keyof T & string;
  cityFieldName: keyof T & string;
  countryFieldName: keyof T & string;
  rootProps?: Partial<IAutoCompleteProps>;
  stateId?: string;
  stateName?: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
}

//? Gets the country and shows states in dropdown

export function State<T extends { [key: string]: any }>({
  formik,
  cityFieldName,
  stateFieldName,
  countryFieldName,
  rootProps,
  stateId,
  stateName,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    ["getStates", formik.values[countryFieldName]?.key],
    () => getStates(Number(formik.values[countryFieldName].key)),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!formik.values[countryFieldName]?.key,
    }
  );
  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: stateFieldName,
    formik: formik,
    id: stateId,
    OPTIONS: OPTIONS,
    name: stateName,
  });

  useEffect(() => {
    if (
      countryFieldName &&
      !!formik.values[countryFieldName] &&
      !formik.values[countryFieldName]?.key
    ) {
      formik.setFieldValue(cityFieldName, { key: "", value: "" });
    }
  }, [cityFieldName, countryFieldName, formik]);

  const changeHandler = (value: any) => {
    formik.setFieldValue(stateFieldName, value);
    formik.setFieldValue(cityFieldName, { key: "", value: "" });
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: GPSBold,
        placeholder: "State/Province",
        disabled:
          !formik.values[countryFieldName] ||
          !formik.values[countryFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(
        stateFieldName,
        label ? label : "State/Province",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
