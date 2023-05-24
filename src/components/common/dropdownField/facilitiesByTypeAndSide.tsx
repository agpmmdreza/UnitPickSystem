import { getFacilitiesByTypeAndSide } from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import { HospitalBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import {
  IDefaultProps as IAutoCompleteProps,
  IMenuOption,
} from "components/core/autoComplete";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { useDropdownsOptions } from "hooks/useOptions";

export interface IHFNameProps<T> {
  formik: FormikProps<T>;
  hfTypeFieldName: string;
  hfSideFieldName: string;
  hfNameFieldName: string;
  robotIDFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  facilityId?: string;
  facilityName?: string;
  disabled?: boolean;
}

export function FacilitiesByTypeAndSide<T extends { [key: string]: any }>({
  formik,
  hfSideFieldName,
  hfNameFieldName,
  hfTypeFieldName,
  robotIDFieldName,
  rootProps,
  facilityId,
  facilityName,
  disabled,
}: IHFNameProps<T>) {
  //? Returns the facility
  const { data, isError, isLoading } = useQuery(
    [
      "getFacilitiesByTypeAndSide",
      "side:",
      formik.values[hfSideFieldName]?.key,
      "type:",
      formik.values[hfTypeFieldName]?.key,
    ],
    () =>
      getFacilitiesByTypeAndSide({
        side: formik.values[hfSideFieldName].key,
        type: formik.values[hfTypeFieldName].key,
      }),
    {
      enabled:
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

  const changeHandler = (value: IMenuOption) => {
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
          !formik.values[hfSideFieldName] ||
          !formik.values[hfSideFieldName].key ||
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
