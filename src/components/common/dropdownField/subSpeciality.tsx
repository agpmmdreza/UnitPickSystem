import {getSubSpecialities} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {GPSBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface IStateProps<T> {
  formik: FormikProps<T>;
  specialityFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  subSpecialityFieldName: string;
  disabled?: boolean;
  noPadding?: boolean;
  label?: string;
  subSpecialityId?: string;
  subSpecialityName?: string;
}

//? Gets the country and shows states in dropdown

export function DoctorSubSpeciality<T extends { [key: string]: any }>({
  formik,
  specialityFieldName,
  subSpecialityFieldName,
  subSpecialityName,
  subSpecialityId,
  rootProps,
  disabled,
  noPadding,
  label,
}: IStateProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getSubSpecialities.name, formik.values[specialityFieldName]?.key],
    () => getSubSpecialities(formik.values[specialityFieldName].key),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!formik.values[specialityFieldName]?.key,
    }
  );
  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: subSpecialityFieldName,
    formik: formik,
    id: subSpecialityId,
    OPTIONS: OPTIONS,
    name: subSpecialityName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(subSpecialityFieldName, value);
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: GPSBold,
        placeholder: "Sub-Specialty",
        disabled:
          !formik.values[specialityFieldName] ||
          !formik.values[specialityFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(
        subSpecialityFieldName,
        label ? label : "Sub-Specialty",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
