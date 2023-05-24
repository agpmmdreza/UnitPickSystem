import {getFacilityTypes} from "api/dropdown";
import {useDropdownsOptions} from "./useOptions";
import {useQuery} from "react-query";

// hook that fetch and save facility type options
export function useHFTypesOptions() {
  const { data, ...rest } = useQuery("getFacilityTypes", getFacilityTypes, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
}
