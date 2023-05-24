import {getFacilitySides} from "api/dropdown";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import FormAutoComplete from "components/form/formAutoComplete";
import {HospitalBold} from "components/icon";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";

export interface IFacilitySideProps<T> {
  formik: FormikProps<T>;
  facilitySideFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  sideId?: string;
  sideName?: string;
  hfNameFieldName?: string;
}

//? Retutns the facility options

export function FacilitySide<T extends { [key: string]: any }>({
  facilitySideFieldName,
  formik,
  rootProps,
  sideId,
  sideName,
  hfNameFieldName,
}: IFacilitySideProps<T>) {
  const { data, isError, isLoading } = useQuery(
    "getFacilitySides",
    getFacilitySides,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: facilitySideFieldName,
    formik: formik,
    id: sideId,
    OPTIONS: OPTIONS,
    name: sideName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(facilitySideFieldName, value);
    if (hfNameFieldName) {
      formik.setFieldValue(hfNameFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: HospitalBold,
        placeholder: "Healthcare Facility Side",
        disabled: isError || isLoading,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(
        facilitySideFieldName,
        "Healthcare Facility Side",
        formik
      )}
      onChange={changeHandler}
    />
  );
}
