import { getNotAssignedToFacilityRobots } from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import { EmojiHappyBold } from "components/icon";
import { useQuery } from "react-query";
import { getFormikFieldProps } from "utils/form";
import {
  IDefaultProps as IAutoCompleteProps,
  IMenuOption,
} from "components/core/autoComplete";
import { FormikProps } from "formik";
import { useDropdownDefaultValue } from "hooks/useDropdownDefaultValue";
import { useDropdownsOptions } from "hooks/useOptions";

//? checks whether the facility assigned to robot

export interface IRobotIDProps<T> {
  formik: FormikProps<T>;
  robotIDFieldName: string;
  robotLevelFieldName: string;
  robotTypeFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  robotId?: string;
  robotName?: string;
  disabled?: boolean;
}

export function NotAssignedToFacilityRobots<T extends { [key: string]: any }>({
  formik,
  robotIDFieldName,
  robotLevelFieldName,
  robotTypeFieldName,
  rootProps,
  robotId,
  robotName,
  disabled,
}: IRobotIDProps<T>) {
  const { data, isError, isLoading } = useQuery(
    [
      "getNotAssignedToFacilityRobots",
      "type:",
      formik.values[robotTypeFieldName]?.key,
      "level:",
      formik.values[robotLevelFieldName]?.key,
    ],
    () =>
      getNotAssignedToFacilityRobots({
        type: formik.values[robotTypeFieldName].key,
        level: formik.values[robotLevelFieldName].key,
      }),
    {
      enabled:
        !!formik.values[robotLevelFieldName]?.key &&
        !!formik.values[robotTypeFieldName]?.key,
    }
  );
  const OPTIONS = useDropdownsOptions({ data: data });
  useDropdownDefaultValue({
    fieldName: robotIDFieldName,
    formik: formik,
    id: robotId,
    OPTIONS: OPTIONS,
    name: robotName,
  });

  const changeHandler = (value: IMenuOption) => {
    formik.setFieldValue(robotIDFieldName, value);
    if (value.key !== "") {
      formik.setFieldError(robotIDFieldName, undefined);
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: EmojiHappyBold,
        placeholder: "Robot ID",
        disabled:
          !formik.values[robotLevelFieldName] ||
          !formik.values[robotLevelFieldName].key ||
          !formik.values[robotTypeFieldName] ||
          !formik.values[robotTypeFieldName].key ||
          isError ||
          isLoading ||
          disabled,
        ...rootProps,
      }}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(robotIDFieldName, "Robot ID", formik)}
      onChange={changeHandler}
    />
  );
}
