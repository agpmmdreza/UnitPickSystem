import {getAllDepartments} from "api/dropdown";
import {useQuery} from "react-query";
import {useDropdownsOptions} from "./useOptions";

// hook that return all department options and save it
export function useAllDepartmentsOptions() {
  const { data, ...rest } = useQuery("getAllDepartments", getAllDepartments, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
}
