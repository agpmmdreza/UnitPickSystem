import {getCityFacilitiesByType} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {HospitalBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface IHFNameProps<T> {
  formik: FormikProps<T>;
  hfTypeFieldName: keyof T & string;
  cityFieldName: keyof T & string;
  hfNameFieldName: keyof T & string;
  departmentFieldName?: keyof T & string;
  doctorFieldName?: keyof T & string;
  rootProps?: Partial<IAutoCompleteProps>;
  facilityId?: string;
  facilityName?: string;
  disabled?: boolean;
  departmentsFieldName?: string;
  cityId?: string;
  noPadding?: boolean;
}

//? Gets the type from props and specifies the type of health facility

export function HFName<T extends { [key: string]: any }>({
  formik,
  cityFieldName,
  hfNameFieldName,
  hfTypeFieldName,
  departmentFieldName,
  doctorFieldName,
  rootProps,
  facilityId,
  facilityName,
  disabled,
  departmentsFieldName,
  cityId,
  noPadding,
}: IHFNameProps<T>) {
  const { data, isError, isLoading } = useQuery(
    [
      "getCityFacilitiesByType",
      "city:",
      formik.values[cityFieldName]?.key,
      "type:",
      formik.values[hfTypeFieldName]?.key,
    ],
    () =>
      getCityFacilitiesByType(
        Number(cityId || formik.values[cityFieldName].key),
        formik.values[hfTypeFieldName].key
      ),
    {
      enabled:
        !!formik.values[hfTypeFieldName]?.key &&
        !!formik.values[cityFieldName]?.key,
    }
  );

  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: hfNameFieldName,
    formik: formik,
    id: facilityId,
    OPTIONS: OPTIONS,
    name: facilityName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(hfNameFieldName, value);
    formik.setFieldError(hfNameFieldName, undefined);
    if (departmentFieldName) {
      formik.setFieldValue(departmentFieldName, { key: "", value: "" });
    }
    if (departmentsFieldName) {
      formik.setFieldValue(departmentsFieldName, []);
    }
    if (doctorFieldName) {
      formik.setFieldValue(doctorFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: HospitalBold,
        placeholder: "HF Name",
        disabled:
          !formik.values[hfTypeFieldName] ||
          !formik.values[hfTypeFieldName].key ||
          !formik.values[cityFieldName] ||
          !formik.values[cityFieldName].key ||
          isLoading ||
          isError ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(hfNameFieldName, "HF Name", formik)}
      onChange={changeHandler}
    />
  );
}
