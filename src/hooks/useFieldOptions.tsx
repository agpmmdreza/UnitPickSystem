import {IMenuOption} from "interfaces";
import {QueryKey, useQuery} from "react-query";
import {IResponse} from "api/index";
import {useEffect, useState} from "react";
// import { IDropdownResponse } from "api/dropdown";
import {getDropdownOption} from "utils/dropdowns";
import {FormikProps} from "formik";

// hook that set options to field
function useFiledOptions(
  queryKey: QueryKey,
  queryFn: () => Promise<IResponse<any[]>>,
  config: any, // TODO: declare its type
  formik?: FormikProps<any>,
  filedName?: string,
  defaultId?: string
) {
  const [options, setOptions] = useState<IMenuOption[]>([]);
  useQuery(queryKey, queryFn, {
    ...config,
    onSuccess: (data) => {
      if (data?.data.data) {
        const formattedOptions: IMenuOption[] = data?.data.data.map(
          (item: any) => {
            return { key: item.id + "", value: item.name + "" };
          }
        );
        setOptions(formattedOptions);
      }
    },
  });

  useEffect(() => {
    if (
      !!defaultId &&
      !!options.length &&
      !!formik &&
      !!filedName &&
      !formik.values[filedName].key
    ) {
      formik.setFieldValue(
        filedName,
        getDropdownOption(options, "", defaultId)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultId, options]);

  // TODO: remove dependencies after field cleared

  return { options, setOptions };
}

export default useFiledOptions;
