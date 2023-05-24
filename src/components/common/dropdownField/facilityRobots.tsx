import { getFacilityRobots } from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import { EmojiHappyBold } from "components/icon";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { useDropdownsOptions } from "hooks/useOptions";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { IDropdown } from "./IDropdown";

export interface IFacilityRobotsProps<T> extends IDropdown<T> {
  facilityFieldName: string;

  //   /**
  //    *  the name of the robot dropdown field that u use in formik.
  //    *  this is required because the robot dropdown is depend on this dropdown.
  //    *    so by changing this dropdown value the robot dropdown value must be cleared and refetch to receive the new data.
  //    */
  //   robotFiledName:string
}

export function FacilityRobots<T extends { [key: string]: any }>({
  facilityFieldName,
  fieldName,
  formik,
  disabled,
  noPadding,
  id,
  label,
  name,
  rootProps,
}: IFacilityRobotsProps<T>) {
  //get facility robot from server
  const { data, isLoading, isError } = useQuery(
    [getFacilityRobots.name, formik.values[facilityFieldName]?.key],
    () => getFacilityRobots(Number(formik.values[facilityFieldName].key)),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!formik.values[facilityFieldName]?.key,
    }
  );

  //extract options from received data
  const OPTIONS = useDropdownsOptions({ data: data });

  // search and select (if can) in options where
  // options.key === id OR options.value === name
  useDropdownDefaultValue({
    fieldName: fieldName,
    formik: formik,
    id: id,
    OPTIONS: OPTIONS,
    name: name,
  });

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: EmojiHappyBold,
        placeholder: label || "Robots",
        disabled:
          !formik.values[facilityFieldName] ||
          !formik.values[facilityFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(fieldName, label ? label : "Robots", formik)}
    />
  );
}
