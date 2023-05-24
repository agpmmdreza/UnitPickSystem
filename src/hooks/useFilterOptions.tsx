import {IResponse} from "api";
import {IDropdownResponse} from "api/dropdown";
import {useQuery} from "react-query";
import {useDropdownsOptions} from "./useOptions";

const useFilterOptions = (
  queryFn: () => Promise<IResponse<IDropdownResponse[]>> | undefined
) => {
  const { data } = useQuery(queryFn.name, queryFn, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS = useDropdownsOptions({ data: data });
  return OPTIONS;
};

export default useFilterOptions;
