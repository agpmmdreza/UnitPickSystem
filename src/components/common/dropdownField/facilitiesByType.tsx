import { FormikProps } from "formik";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import { getFacilitiesByType } from "api/dropdown";
import { useQuery } from "react-query";
import { useDropdownsOptions } from "hooks/useOptions";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import { HospitalBold } from "components/icon";
import { getFormikFieldProps } from "utils/form";

export interface IFacilitiesByTypeProps<T> {
  formik: FormikProps<T>;
  facilityFieldName: string; // the field name of this dropdown that u use in formik field.
  facilityTypeFieldName: string; // the 'facility type' field name that u use in formik field.
  // because facility field is dependent to the 'facility type' field.
  // that means if the 'facility type' field is changed the facility must change too.
  robotIdFieldName?: string; // the robotID field name that u use in formik field.
  // because doctorID field is dependent to the facility field (not all. In some pages).
  // that means if the speciality field is changed the robotID must change too.
  rootProps?: Partial<IAutoCompleteProps>;
  facilityId?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the facility which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'facilityId'
  facilityName?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the facility which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'facilityName'
  disabled?: boolean;
}

function FacilitiesByType<T extends { [key: string]: any }>({
  facilityFieldName,
  formik,
  disabled,
  facilityId,
  facilityName,
  facilityTypeFieldName,
  robotIdFieldName,
  rootProps,
}: IFacilitiesByTypeProps<T>) {
  const { data, isError, isLoading } = useQuery(
    [
      "getCityFacilitiesByType",
      "type:",
      formik.values[facilityTypeFieldName]?.key,
    ],
    () =>
      getFacilitiesByType({
        hf_type: formik.values[facilityTypeFieldName].key,
      }),
    {
      enabled:
        !!formik.values[facilityTypeFieldName]?.key &&
        !!formik.values[facilityTypeFieldName]?.key,
    }
  );

  // search and select (if can) in options where
  // options.key === facilityId OR options.value === facilityName
  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: facilityFieldName,
    formik: formik,
    id: facilityId,
    OPTIONS: OPTIONS,
    name: facilityName,
  });

  // field value change handler
  const changeHandler = (value: any) => {
    formik.setFieldValue(facilityFieldName, value);

    // because the 'doctor name' field is depend on speciality field, so by changing speciality we have to clear the 'doctor name' field's value
    if (robotIdFieldName) {
      formik.setFieldValue(robotIdFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: HospitalBold,
        placeholder: "HF Name",
        disabled:
          isLoading ||
          isError ||
          disabled ||
          !formik.values[facilityTypeFieldName] ||
          !formik.values[facilityTypeFieldName].key,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(facilityFieldName, "HF Name", formik)}
      onChange={changeHandler}
    />
  );
}

export default FacilitiesByType;
