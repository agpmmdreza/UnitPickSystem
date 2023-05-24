import { getFacilityDoctorByDNA } from "api/dropdown";
import { IDefaultProps as IAutoCompleteProps } from "components/core/autoComplete";
import FormAutoComplete from "components/form/formAutoComplete";
import { FrameBold } from "components/icon";
import { FormikProps } from "formik";
import { useDropdownsOptions } from "hooks/useOptions";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";

export interface IFacilityDoctorsByDnaProps<T> {
  formik: FormikProps<T>;
  rootProps?: Partial<IAutoCompleteProps>;
  hfNameFieldName: string;
  doctorFieldName: string;
  dnaId: number;
}

//? Gets the dna and returns the facility based on it

export function FacilityDoctorsByDna<T extends { [key: string]: any }>({
  dnaId,
  doctorFieldName,
  formik,
  hfNameFieldName,
  rootProps,
}: IFacilityDoctorsByDnaProps<T>) {
  const { data, isLoading, isError } = useQuery(
    ["getFacilityDoctorByDNA", formik.values[hfNameFieldName]?.key],

    () =>
      getFacilityDoctorByDNA(
        Number(formik.values[hfNameFieldName]?.key),
        dnaId
      ),
    {
      enabled: !!formik.values[hfNameFieldName]?.key && !!dnaId,
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
