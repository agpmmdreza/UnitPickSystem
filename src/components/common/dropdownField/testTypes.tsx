import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {AppointmentBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDropdown} from "./IDropdown";
import {useTestTypeOptions} from "hooks/dropdownOptions/useTestTypeOptions";

export interface ITestTypeProps<T> extends IDropdown<T> {
  testTypeId?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the test type which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'specialtyId'
  testTypeName?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the test type which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'specialtyName'
  intakeFormTestTypes?: boolean;
}

export function TestTypes<T extends { [key: string]: any }>({
  fieldName,
  formik,
  disabled,
  rootProps,
  testTypeId,
  testTypeName,
  label,
  intakeFormTestTypes,
}: ITestTypeProps<T>) {
  // get dropdown options from server
  const { OPTIONS, isError, isLoading } =
    useTestTypeOptions(intakeFormTestTypes);

  // search and select (if can) in options where
  // options.key === specialtyId OR options.value === specialtyName
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: testTypeId,
    OPTIONS: OPTIONS,
    name: testTypeName,
  });

  return (
    <FormAutoComplete
      rootProps={{
        icon: AppointmentBold,
        placeholder: label || "Test Type",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, label || "Test Type", formik)}
    />
  );
}

export default TestTypes;
