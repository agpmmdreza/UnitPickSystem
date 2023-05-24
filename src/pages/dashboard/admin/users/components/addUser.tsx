import yup from "utils/yupExtended";
import Grid from "components/core/Grid";
import {useState} from "react";
import {useFormik} from "formik";
import {useHistory} from "react-router";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import {IdBold, MailTrackingBold, UserBold} from "components/icon";
import {getFormikFieldProps} from "utils/form";
import Page from "components/layout/page";
import {Roles} from "components/common/dropdownField/roles";
import {IMenuOption} from "interfaces";
import {useMutation} from "react-query";
import {addUser} from "api/users";

const REQUIRED_FIELD_MESSAGE = "This field is required.";

export interface IAddUserFields {
  firstName: string;
  lastName: string;
  code: string;
  password: string;
  major: string;
  role: IMenuOption;
}

export const defaultValues: IAddUserFields = {
  firstName: "",
  lastName: "",
  code: "",
  password: "",
  major: "",
  role: { key: "", value: "" },
};
export const ValidationSchema = yup.object().shape({
  firstName: yup.string().required(REQUIRED_FIELD_MESSAGE),
  lastName: yup.string().required(REQUIRED_FIELD_MESSAGE),
  code: yup.string().required(REQUIRED_FIELD_MESSAGE),
  password: yup.string().required(REQUIRED_FIELD_MESSAGE),
  major: yup.string().required(REQUIRED_FIELD_MESSAGE),
  role: yup.object().dropdown(),
});

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const history = useHistory();

  const { mutate } = useMutation(addUser);

  const formik = useFormik<IAddUserFields>({
    initialValues: defaultValues,
    validationSchema: ValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      mutate({
        ...values,
        role: values.role.key,
      });
    },
  });

  return (
    <Page title="افزودن کاربر" type="inner" backTo="pop">
      <form onSubmit={formik.handleSubmit}>
        <Grid flowDense>
          <FormInput
            {...getFormikFieldProps("firstName", "نام", formik)}
            rootProps={{ placeholder: "نام", icon: UserBold }}
          />
          <FormInput
            {...getFormikFieldProps("lastName", "نام خانوادگی", formik)}
            rootProps={{ placeholder: "نام خانوادگی", icon: UserBold }}
          />

          <Roles formik={formik} fieldName="role" />

          <FormInput
            {...getFormikFieldProps("code", "نام کاربری", formik)}
            rootProps={{ placeholder: "نام کاربری", icon: IdBold }}
          />

          <FormInput
            rootProps={{
              icon: MailTrackingBold,
              placeholder: "رشته تحصیلی",
            }}
            {...getFormikFieldProps("major", "رشته تحصیلی", formik)}
          />

          <FormInput
            {...getFormikFieldProps("password", "رمز عبور", formik)}
            rootProps={{ placeholder: "رمز عبور", icon: IdBold }}
          />
          {/* <Country
          countryFieldName={"country"}
          formik={formik}
          stateFieldName={"state"}
          label={"HF Country"}
        />
        <State
          cityFieldName={"city"}
          countryFieldName={"country"}
          formik={formik}
          stateFieldName={"state"}
          label={"HF State"}
        />
        <City
          cityFieldName={"city"}
          formik={formik}
          stateFieldName={"state"}
          hfNameFieldName={"hfName"}
          label={"HF City"}
        />
        <HFType
          formik={formik}
          hfNameFieldName={"hfName"}
          hfTypeFieldName={"hfType"}
        />
        <HFName
          cityFieldName={"city"}
          formik={formik}
          hfNameFieldName={"hfName"}
          hfTypeFieldName={"hfType"}
        /> */}
          {/* <Grid.Column doubleWidth>
          <Departments
            formik={formik}
            hfNameFiled={"hfName"}
            rootProps={{
              icon: DepartmentBold,
              placeholder: "Departments (optional)",
            }}
            departmentIds={departmentIds}
            departmentNames={departmentNames}
          />
        </Grid.Column> */}
        </Grid>
        <div className="d-flex gap-2 justify-content-end mt-5 pt-5">
          <Button
            color={"secondary"}
            variant={"outlined"}
            onClick={() => setCancelOpen(true)}
          >
            لغو
          </Button>
          <Button type="submit">ثبت کاربر</Button>
        </div>
      </form>
    </Page>
  );
};

export default AddUser;
