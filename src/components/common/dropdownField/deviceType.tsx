import FormAutoComplete from "components/form/formAutoComplete";
import {GPSBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDeviceTypesOptions} from "hooks/useDeviceTypesOptions";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";

export interface IDeviceTypeProps<T> {
  formik: FormikProps<T>;
  deviceTypeFieldName: string;
  deviceIDFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  deviceId?: string;
  deviceName?: string;
  disabled?: boolean;
}

export function DeviceType<T extends { [key: string]: any }>({
  deviceTypeFieldName,
  formik,
  rootProps,
  deviceId,
  deviceName,
  deviceIDFieldName,
  disabled,
}: IDeviceTypeProps<T>) {
  const { OPTIONS, isError, isLoading } = useDeviceTypesOptions();

  //? Default values for dropdown
  useDropdownDefaultValue({
    fieldName: deviceTypeFieldName,
    formik: formik,
    id: deviceId,
    OPTIONS: OPTIONS,
    name: deviceName,
  });
  //? applies the changes to server
  const changeHandler = (value: any) => {
    formik.setFieldValue(deviceTypeFieldName, value);
    if (deviceIDFieldName) {
      formik.setFieldValue(deviceIDFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: GPSBold,
        placeholder: "Device Type",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(deviceTypeFieldName, "Device Type", formik)}
      onChange={changeHandler}
    />
  );
}
