import {getCountryTimezones} from "api/dropdown"; // TODO
import FormAutoComplete from "components/form/formAutoComplete";
import {ClockBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
// import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
// import { getDropdownOption } from "utils/dropdowns";
// import { useEffect } from "react";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface ITimezoneProps {
  formik: any; // TODO : fix this
  countryFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  timezoneId?: string;
  timezoneName?: string;
  filedName: string;
  noPadding?: boolean;
}

//? gets the country and defines time zone

export function Timezone({
  countryFieldName = "",
  formik,
  rootProps,
  timezoneId,
  timezoneName,
  filedName,
  noPadding,
}: ITimezoneProps) {
  const { data, isLoading, isError } = useQuery(
    `getCountryTimezones-${formik.values[countryFieldName]?.key}`,
    () => getCountryTimezones(formik.values[countryFieldName]?.key),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!formik.values[countryFieldName]?.key && !!countryFieldName,
    }
  );

  const OPTIONS = useDropdownsOptions({ data: data });
  // useEffect(() => {
  //   if (!!OPTIONS?.length && !!timezoneId) {
  //     formik.setFieldValue(
  //       filedName,
  //       getDropdownOption(OPTIONS, "", timezoneId)
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data, timezoneId]);

  useDropdownDefaultValue({
    fieldName: filedName,
    formik: formik,
    id: timezoneId,
    OPTIONS: OPTIONS,
    name: timezoneName,
  });

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: ClockBold,
        placeholder: "Timezone",
        // disabled: isLoading || isError || !formik.values[countryFieldName].key,
        disabled:
          isLoading ||
          isError ||
          !formik.values[countryFieldName]?.key ||
          !countryFieldName,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(filedName, "Timezone", formik)}
    />
  );
}

Timezone.defaultProps = {
  filedName: "timezone",
};
