import { getUsersByRole, IUsersByRoleParams } from "api/dropdown";
import { UserBold } from "components/icon";
import { useDropdownsOptions } from "hooks/useOptions";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Dropdown } from "./dropdown";
import { IDropdown } from "./IDropdown";

interface IProps<T> extends IDropdown<T> {
  params: IUsersByRoleParams;
}

function UserByRoleName<T extends { [key: string]: any }>(props: IProps<T>) {
  const allowedParams = useMemo(() => {
    const allowedParams: IUsersByRoleParams = {
      role_name: props.params.role_name,
    };
    for (let index = 0; index < Object.keys(props.params).length; index++) {
      const key = Object.keys(props.params)[index] as keyof typeof props.params;
      if (!!props.params[key] && key !== "role_name") {
        Object(allowedParams)[key] = props.params[key];
      }
    }
    // console.log(allowedParams);
    return allowedParams;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.params]);

  const { data, isError, isLoading } = useQuery(
    [getUsersByRole.name, props.params],
    () => getUsersByRole(allowedParams),
    {
      keepPreviousData: false,
    }
  );
  const OPTIONS = useDropdownsOptions({ data: data });

  return (
    <Dropdown
      {...props}
      {...{ isError, isLoading }}
      icon={UserBold}
      options={OPTIONS ? OPTIONS : []}
    />
  );
}

export { UserByRoleName };
