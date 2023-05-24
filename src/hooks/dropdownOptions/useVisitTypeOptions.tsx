import {useDropdownsOptions} from "../useOptions";
import {useQuery} from "react-query";
import {getVisitTypes} from "api/dropdown";

export function useVisitTypeOptions() {
  const { data, ...rest } = useQuery("getVisitTypes", getVisitTypes, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
}
