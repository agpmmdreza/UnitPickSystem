import {getRobotLevels} from "api/dropdown";
import {useDropdownsOptions} from "hooks/useOptions";
import {useQuery} from "react-query";

const useRobotLevelOptions = () => {
  const { data, ...rest } = useQuery(getRobotLevels.name, getRobotLevels, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
};

export default useRobotLevelOptions;
