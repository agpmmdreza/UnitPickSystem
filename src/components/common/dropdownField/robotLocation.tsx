import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {getFormikFieldProps} from "utils/form";
import {MonitorBold} from "components/icon/monitorBold";
import useRobotLocationOptions from "hooks/dropdownOptions/useRobotLocationOptions";
import {IDropdown} from "./IDropdown";

export interface IRobotLocationProps<T> extends IDropdown<T> {
  robotLocationId?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the robot-location which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'specialtyId'
  robotLocationName?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the robot-location which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'specialtyName'
}

export function RobotLocation<T extends { [key: string]: any }>({
  fieldName,
  formik,
  disabled,
  noPadding,
  rootProps,
  robotLocationId: visitTypeId,
  robotLocationName: visitTypeName,
}: IRobotLocationProps<T>) {
  // get dropdown options from server
  const { OPTIONS, isError, isLoading } = useRobotLocationOptions();

  // search and select (if can) in options where
  // options.key === specialtyId OR options.value === specialtyName
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: visitTypeId,
    OPTIONS: OPTIONS,
    name: visitTypeName,
  });

  return (
    <FormAutoComplete
      rootProps={{
        icon: MonitorBold,
        placeholder: "Robot Location",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      noPadding
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, "Robot Location", formik)}
    />
  );
}
