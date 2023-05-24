import {getFacilityRobotsByTypeAndLevel} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {EmojiHappyBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps, IMenuOption,} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface IRobotIDByHFProps<T> {
  formik: FormikProps<T>;
  robotIDFieldName: string;
  robotLevelFieldName: string;
  robotTypeFieldName: string;
  hfNameFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  robotId?: string;
  robotName?: string;
  disabled?: boolean;
  departmentFieldName?: string;
}

//? Gets the health facility and defines the robot id

export function RobotIDByHF<T extends { [key: string]: any }>({
  formik,
  robotIDFieldName,
  robotLevelFieldName,
  robotTypeFieldName,
  disabled,
  robotId,
  robotName,
  rootProps,
  hfNameFieldName,
  departmentFieldName,
}: IRobotIDByHFProps<T>) {
  const { data, isError, isLoading } = useQuery(
    [
      "getFacilityRobotsByTypeAndLevel",
      "hf:",
      formik.values[hfNameFieldName]?.key,
      "type:",
      formik.values[robotTypeFieldName]?.key,
      "level:",
      formik.values[robotLevelFieldName]?.key,
      "department:",
      departmentFieldName ? formik.values[departmentFieldName]?.key : null,
    ],
    () =>
      getFacilityRobotsByTypeAndLevel(
        Number(formik.values[hfNameFieldName]?.key),
        formik.values[robotTypeFieldName]?.key,
        formik.values[robotLevelFieldName]?.key,
        !!departmentFieldName
          ? Number(formik.values[departmentFieldName]?.key)
          : undefined
      ),
    {
      enabled:
        !!formik.values[hfNameFieldName]?.key &&
        !!formik.values[robotTypeFieldName]?.key &&
        !!formik.values[robotLevelFieldName]?.key,
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
          !formik.values[hfNameFieldName] ||
          !formik.values[hfNameFieldName].key ||
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
