import {getDoctorsSpecialities} from "api/dropdown";
import {useDropdownsOptions} from "../useOptions";
import {useQuery} from "react-query";

export function useDoctorsSpecialitiesOptions() {
  const { data, ...rest } = useQuery(
    "getDoctorsSpecialities",
    getDoctorsSpecialities,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const OPTIONS = useDropdownsOptions({ data: data });
  return { OPTIONS: OPTIONS, ...rest };
}
