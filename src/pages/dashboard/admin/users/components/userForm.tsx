import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { getFormikFieldProps } from "utils/form";
import { Roles } from "components/common/dropdownField/roles";
import { IMenuOption } from "interfaces";
import { Majors } from "components/common/dropdownField/majors";
import { IUserData } from "api/users";
import { Years } from "components/common/dropdownField/years";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

export interface IAddUserFields {
  firstName: string;
  lastName: string;
  code: string;
  password: string;
  entranceYear: IMenuOption;
  major: IMenuOption;
  role: IMenuOption;
}

interface IUserFormProps {
  onSumbit: (values: IUserData) => void;
  initialValues?: IAddUserFields;
}

export const defaultValues: IAddUserFields = {
  firstName: "",
  lastName: "",
  code: "",
  password: "",
  major: { key: "", value: "" },
  entranceYear: { key: "", value: "" },
  role: { key: "", value: "" },
};
export const ValidationSchema = yup.object().shape({
  firstName: yup.string().required(REQUIRED_FIELD_MESSAGE),
  lastName: yup.string().required(REQUIRED_FIELD_MESSAGE),
  code: yup.string().required(REQUIRED_FIELD_MESSAGE),
  password: yup.string().required(REQUIRED_FIELD_MESSAGE),
  entranceYear: yup.object().dropdown(),
  major: yup.object().dropdown(),
  role: yup.object().dropdown(),
});

const UserForm = ({ onSumbit, initialValues }: IUserFormProps) => {
  const history = useHistory();
  const formik = useFormik<IAddUserFields>({
    initialValues: initialValues || defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      onSumbit({
        ...values,
        major: values.major.value,
        role: values.role.key,
        entranceYear: values.entranceYear.key,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid flowDense>
        <FormInput
          {...getFormikFieldProps("firstName", "نام", formik)}
          rootProps={{ placeholder: "نام" }}
        />
        <FormInput
          {...getFormikFieldProps("lastName", "نام خانوادگی", formik)}
          rootProps={{ placeholder: "نام خانوادگی" }}
        />

        <Roles
          formik={formik}
          fieldName="role"
          roleId={initialValues?.role.key}
        />

        <FormInput
          {...getFormikFieldProps("code", "نام کاربری", formik)}
          rootProps={{ placeholder: "نام کاربری" }}
        />

        {/* <FormInput
          rootProps={{
            icon: MailTrackingBold,
            placeholder: "رشته تحصیلی",
          }}
          {...getFormikFieldProps("major", "رشته تحصیلی", formik)}
        /> */}
        <Majors
          formik={formik}
          majorFieldName="major"
          rootProps={{
            placeholder: "رشته تحصیلی",
          }}
          majorName={initialValues?.major.value}
          majorId={initialValues?.major.value}
        />

        <Years formik={formik} fieldName="entranceYear" />

        <FormInput
          {...getFormikFieldProps("password", "رمز عبور", formik)}
          rootProps={{ placeholder: "رمز عبور" }}
        />
      </Grid>
      <div className="d-flex gap-2 justify-content-end mt-5 pt-5">
        <Button
          color={"secondary"}
          variant={"outlined"}
          onClick={() => history.goBack()}
        >
          لغو
        </Button>
        <Button type="submit">ثبت کاربر</Button>
      </div>
    </form>
  );
};

export default UserForm;
