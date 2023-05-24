import { getFacilityDoctors } from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import { FrameBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import { FormikProps } from "formik";
import { useDropdownsOptions } from "hooks/useOptions";

export interface IFacilityDoctorsProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IAutoCompleteProps>;
  hfNameFieldName: string;
  doctorFieldName: string;
}

//? Returns doctors facilities

export function FacilityDoctors<T extends { [key: string]: any }>({
  doctorFieldName,
  formik,
  hfNameFieldName,
  rootProps,
}: IFacilityDoctorsProps<T>) {
  const { data, isLoading, isError } = useQuery(
    ["getFacilityDoctors", formik.values[hfNameFieldName]?.key],

    () => getFacilityDoctors(Number(formik.values[hfNameFieldName]?.key)),
    {
      enabled: !!formik.values[hfNameFieldName]?.key,
    }
  );
  const OPTIONS = useDropdownsOptions({ data: data });

  return (
    <FormAutoComplete
      rootProps={{
        icon: FrameBold,
        placeholder: "Doctor Name",
        disabled:
          !formik.values[hfNameFieldName] ||
          !formik.values[hfNameFieldName].key ||
          isError ||
          isLoading,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(doctorFieldName, "Doctor Name", formik)}
    />
  );
}
