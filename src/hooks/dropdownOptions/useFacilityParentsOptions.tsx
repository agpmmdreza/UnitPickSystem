import {useDropdownsOptions} from "../useOptions";
import {useQuery} from "react-query";
import {getFacilityParents} from "api/dropdown";

export function useFacilityParentsOptions() {
  const { data, ...rest } = useQuery(
    getFacilityParents.name,
    getFacilityParents,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
}
