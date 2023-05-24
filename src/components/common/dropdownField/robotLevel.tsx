import FormAutoComplete from "components/form/formAutoComplete";
import {EmojiHappyBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";
import useRobotLevelOptions from "hooks/dropdownOptions/useRobotLevelOptions";

export interface IRobotLevelProps<T> {
  formik: FormikProps<T>;
  robotLevelFieldName: string;
  robotIDFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  robotLevelId?: string;
  robotLevelName?: string;
  noPadding?: boolean;
}

//? Get robots levels from server and show the =m in dropdown

export function RobotLevel<T extends { [key: string]: any }>({
  formik,
  robotIDFieldName,
  robotLevelFieldName,
  rootProps,
  robotLevelId,
  robotLevelName,
  noPadding,
}: IRobotLevelProps<T>) {
  const { OPTIONS, isError, isLoading } = useRobotLevelOptions();

  useDropdownDefaultValue({
    fieldName: robotLevelFieldName,
    formik: formik,
    id: robotLevelId,
    OPTIONS: OPTIONS,
    name: robotLevelName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(robotLevelFieldName, value);
    if (robotIDFieldName) {
      formik.setFieldValue(robotIDFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: EmojiHappyBold,
        placeholder: "Robot level",
        disabled: isError || isLoading,
        ...rootProps,
      }}
      noPadding={noPadding}
      options={OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(robotLevelFieldName, "Robot Level", formik)}
      onChange={changeHandler}
    />
  );
}
