import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import FormAutoComplete from "components/form/formAutoComplete";
import {getFormikFieldProps} from "utils/form";
import {IDropdown} from "./IDropdown";
import {UsageCountBold} from "components/icon";
import {useDropdownsOptions} from "hooks/useOptions";
import {useQuery} from "react-query";
import {getFamilyMembers} from "api/dropdown";

export interface IFamilyProps<T> extends IDropdown<T> {
  familyId?: string; // for auto selecting the option in editing or viewing mode.
  // that is the id of the visit type which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'key' === 'specialtyId'
  familyName?: string; // for auto selecting the option in editing or viewing mode.
  // that is the name of the visit type which we receive from server data.
  // we use this for searching in options of this dropdown
  // where 'value' === 'specialtyName'
  patientId?: string | number;
}

export function FamilyMembers<T extends { [key: string]: any }>({
  fieldName,
  formik,
  disabled,
  rootProps,
  familyId: visitTypeId,
  familyName: visitTypeName,
  patientId,
}: IFamilyProps<T>) {
  const { data, isLoading, isError } = useQuery(
    [getFamilyMembers.name, patientId],
    () => getFamilyMembers(patientId || ""),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!patientId,
    }
  );
  const OPTIONS = useDropdownsOptions({ data: data });

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
        icon: UsageCountBold,
        placeholder: "Select Family",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      noPadding
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, "Select Family", formik)}
    />
  );
}
