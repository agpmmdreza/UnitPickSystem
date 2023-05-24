import {getRobots} from "api/dropdown";
import FormAutoComplete from "components/form/formAutoComplete";
import {EmojiHappyBold} from "components/icon";
import {useQuery} from "react-query";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps, IMenuOption,} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import {useDropdownsOptions} from "hooks/useOptions";

export interface IRobotIDProps<T> {
  formik: FormikProps<T>;
  robotIDFieldName: string;
  robotLevelFieldName: string;
  robotTypeFieldName: string;
  rootProps?: Partial<IAutoCompleteProps>;
  robotId?: string;
  robotName?: string;
  disabled?: boolean;
  noPadding?: boolean;
}

/// returns robot id by type and level

export function RobotID<T extends { [key: string]: any }>({
  formik,
  robotIDFieldName,
  robotLevelFieldName,
  robotTypeFieldName,
  rootProps,
  robotId,
  robotName,
  disabled,
  noPadding,
}: IRobotIDProps<T>) {
  const { data, isError, isLoading } = useQuery(
    [
      "getRobots",
      "type:",
      formik.values[robotTypeFieldName]?.key,
      "level:",
      formik.values[robotLevelFieldName]?.key,
    ],
    () =>
      getRobots({
        type: formik.values[robotTypeFieldName].value,
        level: formik.values[robotLevelFieldName].value,
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
      noPadding={noPadding}
      {...getFormikFieldProps(robotIDFieldName, "Robot ID", formik)}
      onChange={changeHandler}
    />
  );
}
