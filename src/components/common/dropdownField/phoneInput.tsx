import {getCountryPhoneCodes} from "api/dropdown";
import {FormikProps} from "formik";
import FormPhoneInput from "components/form/formPhoneInput";
import {useQuery} from "react-query";
import {CallBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {ICountryItem, IDefaultProps as IPhoneInputProps,} from "components/core/phoneInput";
import {useEffect, useMemo, useState} from "react";
import countries from "../../../constants/countries.json";

export interface IPhoneInputDropdownProps<T> {
  formik: FormikProps<T>;
  countryFieldName?: string;
  phoneFieldName: string;
  icon?: any;
  label?: string;
  rootProps?: Partial<IPhoneInputProps>;
  placeholder?: string;
  defaultNumber?: string;
  noPadding?: boolean;
}

//? customized phone input that shows the flag of country with pre code

export function PhoneInputDropdown<T extends { [key: string]: any }>({
  countryFieldName = "",
  formik,
  phoneFieldName,
  label = "Phone Number",
  placeholder = "Phone Number",
  icon = CallBold,
  rootProps,
  defaultNumber,
  noPadding,
}: IPhoneInputDropdownProps<T>) {
  const [flag, setFlag] = useState(false);
  const { data, isLoading, isError } = useQuery(
    ["getCountryPhoneCodes", formik.values[countryFieldName]?.key],
    () => getCountryPhoneCodes(Number(formik.values[countryFieldName]?.key)),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!formik.values[countryFieldName]?.key && !!countryFieldName,
    }
  );

  const COUNTRIES: ICountryItem[] | undefined = useMemo(
    () =>
      data?.data.data?.map((item) => ({
        flag: undefined,
        code: item.name ? item.name : "",
        name: "",
      })),
    [data]
  );
  const selectedCountry = formik.values[countryFieldName]?.key;
  useEffect(() => {
    const number = !!formik.values[phoneFieldName]
      ? formik.values[phoneFieldName].number
      : "";
    if (COUNTRIES && COUNTRIES.length > 0) {
      formik.setFieldValue(phoneFieldName, {
        code: COUNTRIES[0].code,
        number: !!defaultNumber && !flag ? defaultNumber : number,
      });
      setFlag(true);
    }

    // else if (selectedCountry === (undefined || "")) {
    //   formik.setFieldValue(phoneFieldName, {
    //     code: "",
    //     number: !!defaultNumber ? defaultNumber : number,
    //   });
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [COUNTRIES, selectedCountry, defaultNumber, flag]);

  return (
    <FormPhoneInput
      noPadding={noPadding}
      /*countries={COUNTRIES ? COUNTRIES : []}*/
      countries={getCountryCodes()}
      rootProps={{
        disabled:
          // !formik.values[countryFieldName] ||
          // !formik.values[countryFieldName].key ||
          isError || isLoading,
        icon: icon,
        placeholder: placeholder,
        ...rootProps,
      }}
      {...getFormikFieldProps(phoneFieldName, label, formik)}
    />
  );
}
const getCountryCodes = () => {
  return countries.map((record) => ({
    code: record.dialCode,
    flag: record.flag,
    name: record.name,
  }));
};
