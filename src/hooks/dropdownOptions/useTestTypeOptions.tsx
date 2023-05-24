import {useDropdownsOptions} from "../useOptions";
import {useQuery} from "react-query";
import {getIntakeFormTestTypes, getTestTypes} from "api/dropdown";

export function useTestTypeOptions(intakeFormType?: boolean) {
  const { data, ...rest } = useQuery(
    !!intakeFormType ? getIntakeFormTestTypes.name : getTestTypes.name,
    !!intakeFormType ? getIntakeFormTestTypes : getTestTypes,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
}
