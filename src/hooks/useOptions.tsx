import {IResponse} from "api";
import {IDropdownResponse} from "api/dropdown";
import {IMenuOption} from "components/core/autoComplete";
import {useMemo} from "react";

export interface IUseDropdownsOptionsProps {
  data: IResponse<IDropdownResponse[]> | undefined;
}

// hook that memoize dropdown options
export function useDropdownsOptions({ data }: IUseDropdownsOptionsProps) {
  const OPTIONS: IMenuOption[] | undefined = useMemo(
    () =>
      data?.data.data?.map((item) => ({
        key: item.id.toString(),
        value: String(item.name),
        flag: item?.flag,
      })),
    [data]
  );
  return OPTIONS;
}
