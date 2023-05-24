import {FormikProps} from "formik";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {useDoctorsSpecialitiesOptions} from "hooks/dropdownOptions/useDoctorsSpecialitiesOptions";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {getFormikFieldProps} from "utils/form";
import {AwardBold} from "components/icon";

export interface ISpecialityProps<T> {
  formik: FormikProps<T>;
  specialityFieldName: keyof T & string; // the field name of this dropdown that u use in formik field.
  doctorNameFieldName?: keyof T & string; // the doctor ID field name that u use in formik field.
  // because doctorID field is dependent to the speciality field.
  // that means if the speciality field is changed the doctorId must change too.
  rootProps?: Partial<IAutoCompleteProps>;
  specialtyId?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the speciality which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'specialtyId'
  specialtyName?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the speciality which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'specialtyName'
  subSpecialityFieldName?: string;
  disabled?: boolean;
  label?: string;
  noPadding?: boolean;
}

export function DoctorsSpecialities<T extends { [key: string]: any }>({
  doctorNameFieldName,
  formik,
  specialityFieldName,
  disabled,
  rootProps,
  specialtyId,
  specialtyName,
  subSpecialityFieldName,
  label,
  noPadding,
}: ISpecialityProps<T>) {
  // get dropdown options from server
  const { OPTIONS, isError, isLoading } = useDoctorsSpecialitiesOptions();

  // search and select (if can) in options where
  // options.key === specialtyId OR options.value === specialtyName
  useDropdownDefaultValue({
    fieldName: specialityFieldName,
    formik: formik,
    id: specialtyId,
    OPTIONS: OPTIONS,
    name: specialtyName,
  });

  // field value change handler
  const changeHandler = (value: any) => {
    formik.setFieldValue(specialityFieldName, value);
    if (subSpecialityFieldName != null) {
      formik.setFieldValue(subSpecialityFieldName, { key: "", value: "" });
    }

    // because the 'doctor name' field is depend on speciality field, so by changing speciality we have to clear the 'doctor name' field's value
    if (doctorNameFieldName) {
      formik.setFieldValue(doctorNameFieldName, { key: "", value: "" });
    }
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
      {...getFormikFieldProps(
        specialityFieldName,
        !!label ? label : "Speciality",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
