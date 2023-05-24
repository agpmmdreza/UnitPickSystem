import FormAutoComplete from "components/form/formAutoComplete";
import {EmojiHappyBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import {IDefaultProps as IAutoCompleteProps} from "components/core/autoComplete";
import {FormikProps} from "formik";
import {useRobotTypesOptions} from "hooks/useRobotTypesOptions";
import {useDropdownDefaultValue} from "hooks/useDropdownDefaultValue";

export interface IRobotTypeProps<T> {
  formik: FormikProps<T>;
  robotTypeFieldName: string;
  robotIDFieldName?: string;
  rootProps?: Partial<IAutoCompleteProps>;
  typeId?: string;
  typeName?: string;
  noPadding?: boolean;
  customOptions?: { key: string; value: string }[];
  noHome?: boolean;
}

//? shows robot types in dropdown

export function RobotType<T extends { [key: string]: any }>({
  formik,
  robotIDFieldName,
  robotTypeFieldName,
  rootProps,
  typeId,
  typeName,
  noPadding,
  customOptions,
  noHome,
}: IRobotTypeProps<T>) {
  const { OPTIONS, isError, isLoading } = useRobotTypesOptions(noHome);

  useDropdownDefaultValue({
    fieldName: robotTypeFieldName,
    formik: formik,
    id: typeId,
    OPTIONS: customOptions || OPTIONS,
    name: typeName,
  });

  const changeHandler = (value: any) => {
    formik.setFieldValue(robotTypeFieldName, value);
    if (robotIDFieldName) {
      formik.setFieldValue(robotIDFieldName, { key: "", value: "" });
    }
  };

  return (
    <FormAutoComplete
      rootProps={{
        icon: EmojiHappyBold,
        placeholder: "Robot type",
        disabled: isError || isLoading,
        ...rootProps,
      }}
      noPadding={noPadding}
      options={customOptions ? customOptions : OPTIONS ? OPTIONS : []}
      {...getFormikFieldProps(robotTypeFieldName, "Robot Type", formik)}
      onChange={changeHandler}
    />
  );
}
