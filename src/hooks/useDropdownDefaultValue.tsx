import {IMenuOption} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useEffect, useState} from "react";
import {getDropdownOption} from "utils/dropdowns";

export interface IUseDropdownDefaultValueProps<T> {
  fieldName: keyof T & string;
  formik: FormikProps<T>;
  OPTIONS: IMenuOption[] | undefined;
  id: string | undefined;
  name: string | undefined;
}

// hook that fills the dropdown with default value if not set
export function useDropdownDefaultValue<T extends { [key: string]: any }>({
  fieldName,
  formik,
  OPTIONS,
  id,
  name,
}: IUseDropdownDefaultValueProps<T>) {
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (OPTIONS && !isFilled && (name || id)) {
      formik.setFieldValue(fieldName, getDropdownOption(OPTIONS, name, id));
      setIsFilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OPTIONS, id, name, fieldName, isFilled]);
}
