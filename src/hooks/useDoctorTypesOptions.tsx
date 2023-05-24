import {getDoctorTypes} from "api/dropdown";
import {IMenuOption} from "components/core/autoComplete";
import {useMemo} from "react";
import {useQuery} from "react-query";

export function useDoctorTypesOptions() {
  const { data, ...rest } = useQuery("getDoctorTypes", getDoctorTypes, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const OPTIONS: IMenuOption[] | undefined = useMemo(() => {
    return data?.data.data?.map((item) => {
      return { key: item.id.toString(), value: String(item.name) };
    });
  }, [data]);
  return { OPTIONS: OPTIONS, ...rest };
}
