import {IMenuOption} from "components/core/autoComplete";
import FormAutoComplete from "components/form/formAutoComplete";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {getFormikFieldProps} from "utils/form";
import {IDropdown} from "./IDropdown";

export interface IDropdownProps<T> extends IDropdown<T> {
  options: IMenuOption[];
  isLoading?: boolean;
  isError?: boolean;
}

export function Dropdown<T extends { [key: string]: any }>({
  fieldName,
  formik,
  id,
  name,
  options,
  rootProps,
  label,
  noPadding,
  disabled,
  isError,
  isLoading,
  icon,
}: IDropdownProps<T>) {
  // search and select (if can) in options where
  // options.key === specialtyId OR options.value === specialtyName
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: id,
    OPTIONS: options,
    name: name,
  });

  return (
    <FormAutoComplete
      rootProps={{
        placeholder: label,
        icon: icon,
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      noPadding={noPadding}
      options={options}
      {...getFormikFieldProps(fieldName, label || "", formik)}
    />
  );
}
