import { getDoctorsByCityAndSpeciality } from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import { FrameBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import {
  IDefaultProps as IAutoCompleteProps,
  IMenuOption,
} from "components/core/autoComplete";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { useDropdownsOptions } from "hooks/useOptions";

export interface IDoctorNameProps<T> {
  formik: FormikProps<T>;
  cityFieldName: string;
  doctorFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  doctorId?: string;
  doctorName?: string;
  disabled?: boolean;
  specialityFieldName: string;
  noPadding?: boolean;
}

export function SpecialityDoctorName<T extends { [key: string]: any }>({
  formik,
  cityFieldName,
  doctorFieldName,
  rootProps,
  doctorId,
  doctorName,
  specialityFieldName,
  disabled,
  noPadding,
}: IDoctorNameProps<T>) {
  //? Get data from server
  const { data, isLoading, isError } = useQuery(
    [
      getDoctorsByCityAndSpeciality.name,
      formik.values[cityFieldName]?.key,
      formik.values[specialityFieldName]?.key,
    ],
    () =>
      getDoctorsByCityAndSpeciality(
        Number(formik.values[cityFieldName].key),
        formik.values[specialityFieldName].key
      ),
    {
      enabled:
        !!formik.values[cityFieldName]?.key &&
        !!formik.values[specialityFieldName]?.key,
    }
  );

  //? sets default value to dropdowns
  const OPTIONS = useDropdownsOptions({ data: data });

  useDropdownDefaultValue({
    fieldName: doctorFieldName,
    formik: formik,
    id: doctorId,
    OPTIONS: OPTIONS,
    name: doctorName,
  });

  const changeHandler = (value: IMenuOption) => {
    formik.setFieldValue(doctorFieldName, value);
    if (value.key !== "") {
      formik.setFieldError(doctorFieldName, undefined);
    }
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: FrameBold,
        placeholder: "Doctor Name",
        disabled:
          !formik.values[cityFieldName] ||
          !formik.values[cityFieldName].key ||
          !formik.values[specialityFieldName] ||
          !formik.values[specialityFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(doctorFieldName, "Doctor Name", formik)}
      onChange={changeHandler}
    />
  );
}
