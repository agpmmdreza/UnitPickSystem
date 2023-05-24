import {IMenuOption} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useEffect, useState} from "react";
import {getMultiSelectDropdownOptions} from "utils/dropdowns";

export interface IUseMultiSelectDefaultValueProps<T> {
  fieldName: string;
  formik: FormikProps<T>;
  OPTIONS: IMenuOption[] | undefined;
  ids: string[] | undefined;
  names: string[] | undefined;
}

export function useMultiSelectDefaultValue<T extends { [key: string]: any }>({
  fieldName,
  formik,
  OPTIONS,
  ids,
  names,
}: IUseMultiSelectDefaultValueProps<T>) {
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (OPTIONS && !isFilled && (names || ids)) {
      formik.setFieldValue(
        fieldName,
        getMultiSelectDropdownOptions(OPTIONS, names, ids)
      );
      setIsFilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OPTIONS, ids, names, fieldName, isFilled]);
}
