import {getRobotTypes} from "api/dropdown";
import {useDropdownsOptions} from "./useOptions";
import {useQuery} from "react-query";

// hook that fetch and save robot types
export function useRobotTypesOptions(noHome?: boolean) {
  const { data, ...rest } = useQuery("getRobotTypes", getRobotTypes, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({ data: data });
  return {
    OPTIONS: noHome ? OPTIONS?.filter((i) => i.key !== "home-robot") : OPTIONS,
    ...rest,
  };
}
