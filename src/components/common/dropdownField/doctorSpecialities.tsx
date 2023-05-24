import FormAutoComplete from "components/form/formAutoComplete";
import { AwardBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";
import {
  IDefaultProps as IAutoCompleteProps,
  IMenuOption,
} from "components/core/autoComplete";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { getSpecialities } from "api/dropdown";
import { useDropdownsOptions } from "hooks/useOptions";
import { useQuery } from "react-query";

export interface IDoctorSpecialityProps<T> {
  formik: FormikProps<T>;
  fieldName: keyof T & string;
  rootProps?: Partial<IAutoCompleteProps>;
  defaultValue?: string;
  disabled?: boolean;
  noPadding?: boolean;
  subSpecialityFieldName: string;
}

export function DoctorSpeciality<T extends { [key: string]: any }>({
  defaultValue,
  formik,
  rootProps,
  fieldName,
  disabled,
  noPadding,
  subSpecialityFieldName,
}: IDoctorSpecialityProps<T>) {
  const { data, isError, isLoading } = useQuery(
    ["getDoctorSpeciality"],
    getSpecialities
  );

  //? Sets the shown options for dropdown
  const OPTIONS = useDropdownsOptions({ data: data });

  //? Sets the default values for dropdown
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: defaultValue,
    OPTIONS: OPTIONS,
    name: defaultValue,
  });

  //? Function to update changes on server side
  const changeHandler = (value: IMenuOption) => {
    formik.setFieldValue(fieldName, value);
    formik.setFieldValue(subSpecialityFieldName, { key: "", value: "" });
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: AwardBold,
        placeholder: "Speciality",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, "Speciality", formik)}
      onChange={changeHandler}
    />
  );
}
