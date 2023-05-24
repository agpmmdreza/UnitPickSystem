import FormAutoComplete from "components/form/formAutoComplete";
import {GPSBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDoctorTypesOptions} from "hooks/useDoctorTypesOptions";

export interface IDoctorTypeProps<T> {
  formik: FormikProps<T>;
  doctorTypeFieldName: string;
  doctorIDFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  doctorId?: string;
  doctorName?: string;
  disabled?: boolean;
  noPadding?: boolean;
}

export function DoctorType<T extends { [key: string]: any }>({
  doctorTypeFieldName,
  formik,
  rootProps,
  doctorId,
  doctorName,
  doctorIDFieldName,
  disabled,
  noPadding,
}: IDoctorTypeProps<T>) {
  const { OPTIONS, isError, isLoading } = useDoctorTypesOptions();

  //? Default values for dropdown
  useDropdownDefaultValue({
    fieldName: doctorTypeFieldName,
    formik: formik,
    id: doctorId,
    OPTIONS: OPTIONS,
    name: doctorName,
  });
  //? applies the changes to server
  const changeHandler = (value: any) => {
    formik.setFieldValue(doctorTypeFieldName, value);
    if (doctorIDFieldName) {
      formik.setFieldValue(doctorIDFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: GPSBold,
        placeholder: "Doctor Type",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(doctorTypeFieldName, "Doctor Type", formik)}
      onChange={changeHandler}
    />
  );
}
