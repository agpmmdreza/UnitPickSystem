import FormAutoComplete from "components/form/formAutoComplete";
import {HospitalBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useHFTypesOptions} from "hooks/useHFTypesOptions";

export interface IHFTypeProps<T> {
  formik: FormikProps<T>;
  hfTypeFieldName: keyof T & string;
  hfNameFieldName?: keyof T & string;
  rootProps?: Partial<IAutoCompleteProps>;
  hfTypeId?: string;
  hfTypeName?: string;
  disabled?: boolean;
  noPadding?: boolean;
}
//? Returns the health facility type

export function HFType<T extends { [key: string]: any }>({
  formik,
  hfTypeFieldName,
  hfNameFieldName,
  rootProps,
  hfTypeId,
  hfTypeName,
  disabled,
  noPadding,
}: IHFTypeProps<T>) {
  const { OPTIONS, isError, isLoading } = useHFTypesOptions();

  useDropdownDefaultValue({
    fieldName: hfTypeFieldName,
    formik: formik,
    id: hfTypeId,
    OPTIONS: OPTIONS,
    name: hfTypeName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(hfTypeFieldName, value);
    if (hfNameFieldName) {
      if (Array.isArray(formik.values[hfNameFieldName])) {
        formik.setFieldValue(hfNameFieldName, []);
      } else {
        formik.setFieldValue(hfNameFieldName, { key: "", value: "" });
      }
    }
  };

  return (
    <FormAutoComplete
      noPadding={noPadding}
      rootProps={{
        icon: HospitalBold,
        placeholder: "HF Type",
        disabled: isLoading || isError || disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(hfTypeFieldName, "HF Type", formik)}
      onChange={changeHandler}
    />
  );
}
