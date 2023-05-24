import {useVisitTypeOptions} from "hooks/dropdownOptions/useVisitTypeOptions";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {AppointmentBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDropdown} from "./IDropdown";

export interface IVisitTypeProps<T> extends IDropdown<T> {
  visitTypeId?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the visit type which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'specialtyId'
  visitTypeName?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the visit type which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'specialtyName'
}

export function VisitType<T extends { [key: string]: any }>({
  fieldName,
  formik,
  disabled,
  rootProps,
  visitTypeId,
  visitTypeName,
}: IVisitTypeProps<T>) {
  // get dropdown options from server
  const { OPTIONS, isError, isLoading } = useVisitTypeOptions();

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
        icon: AppointmentBold,
        placeholder: "Visit Type",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      noPadding
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, "Visit Type", formik)}
    />
  );
}
