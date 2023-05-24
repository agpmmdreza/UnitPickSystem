import {useDropdownsOptions} from "../useOptions";
import {useQuery} from "react-query";
import {getRobotLocations} from "api/dropdown";

const useRobotLocationOptions = () => {
  const { data, ...rest } = useQuery("getRobotLocations", getRobotLocations, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
};

export default useRobotLocationOptions;
