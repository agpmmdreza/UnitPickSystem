import {getDeviceTypeDevices} from "api/dropdown";
import {IDefaultProps as IAutoCompleteProps, IMenuOption,} from "components/core/autoComplete";
import FormAutoComplete from "components/form/formAutoComplete";
import {CpuBold} from "components/icon";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";

export interface IDeviceIDProps<T> {
  formik: FormikProps<T>;
  deviceTypeFieldName: string;
  deviceIDFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  deviceId?: string;
  deviceName?: string;
  disabled?: boolean;
}

//! Returns DeviceID DeviceName from given props

export function DeviceID<T extends { [key: string]: any }>({
  formik,
  deviceIDFieldName,
  deviceTypeFieldName,
  rootProps,
  deviceId,
  deviceName,
  disabled,
}: IDeviceIDProps<T>) {
  //? Get Data from server side
  const { data, isError, isLoading } = useQuery(
    ["getDeviceTypeDevices", formik.values[deviceTypeFieldName]?.key],
    () => getDeviceTypeDevices(Number(formik.values[deviceTypeFieldName].key)),
    { enabled: !!formik.values[deviceTypeFieldName]?.key }
  );

  //? Sets the shown options for dropdown
  const OPTIONS = useDropdownsOptions({ data: data });

  //? Sets the default values for dropdown
  useDropdownDefaultValue({
    fieldName: deviceIDFieldName,
    formik: formik,
    id: deviceId,
    OPTIONS: OPTIONS,
    name: deviceName,
  });

  //? Function to update changes on server side
  const changeHandler = (value: IMenuOption) => {
    formik.setFieldValue(deviceIDFieldName, value);
    if (value.key !== "") {
      formik.setFieldError(deviceIDFieldName, undefined);
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: CpuBold,
        placeholder: "Medical Device ID",
        disabled:
          !formik.values[deviceTypeFieldName] ||
          !formik.values[deviceTypeFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(deviceIDFieldName, "Medical Device ID", formik)}
      onChange={changeHandler}
    />
  );
}
