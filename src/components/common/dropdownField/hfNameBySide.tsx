import {getCityFacilitiesByTypeAndSide} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {HospitalBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface IHFNameBySideProps<T> {
  formik: FormikProps<T>;
  hfTypeFieldName: string;
  cityFieldName: string;
  hfNameFieldName: string;
  hfSideFieldName: string;
  robotIDFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  facilityId?: string;
  facilityName?: string;
  disabled?: boolean;
}

export function HFNameBySide<T extends { [key: string]: any }>({
  formik,
  cityFieldName,
  hfNameFieldName,
  hfTypeFieldName,
  hfSideFieldName,
  robotIDFieldName,
  facilityId,
  facilityName,
  rootProps,
  disabled,
}: IHFNameBySideProps<T>) {
  const { data, isError, isLoading } = useQuery(
    [
      "getCityFacilitiesByType",
      "city:",
      formik.values[cityFieldName]?.key,
      "type:",
      formik.values[hfTypeFieldName]?.key,
      "side:",
      formik.values[hfSideFieldName]?.key,
    ],
    () =>
      getCityFacilitiesByTypeAndSide(
        Number(formik.values[cityFieldName].key),
        formik.values[hfTypeFieldName].key,
        formik.values[hfSideFieldName].key
      ),
    {
      enabled:
        !!formik.values[cityFieldName]?.key &&
        !!formik.values[hfTypeFieldName]?.key &&
        !!formik.values[hfSideFieldName]?.key,
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
    if (robotIDFieldName) {
      formik.setFieldValue(robotIDFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
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
