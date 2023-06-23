import FormInput from "components/form/formInput";
import { UserBold } from "components/icon";
import { useFormik } from "formik";
import { getFormikFieldProps } from "utils/form";
import FormPhoneInput from "components/form/formPhoneInput";
import { IPhoneNumber } from "interfaces";
import Button from "components/core/button";
import { editProfileSchema } from "./editProfileSchema";
import countries from "constants/countries.json";
import Grid from "components/core/Grid";

interface IEditProfileFormProps {
  initialValues: IProfileManagement;
}

export interface IProfileManagement {
  firstName: string;
  lastName: string;
  code: string;
}

const EditProfileForm = ({ initialValues }: IEditProfileFormProps) => {
  // const { mutate } = useMutation(updateProfile);
  // const { mutate: updateAvatar } = useMutation(uploadAvatar);
  // const history = useHistory();
  // const queryClient = useQueryClient();
  const formik = useFormik<IProfileManagement>({
    initialValues: initialValues,
    onSubmit: (values) => {},
    validationSchema: editProfileSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid>
          <FormInput
            {...getFormikFieldProps("firstName", "نام", formik)}
            rootProps={{
              placeholder: "نام",
              icon: UserBold,
            }}
          />

          <FormInput
            {...getFormikFieldProps("lastName", "نام خانوادگی", formik)}
            rootProps={{
              placeholder: "نام خانوادگی",
              icon: UserBold,
            }}
          />

          <FormInput
            {...getFormikFieldProps("code", "نام کاربری", formik)}
            rootProps={{
              placeholder: "نام کاربری",
              icon: UserBold,
            }}
          />
        </Grid>

        <div className="d-flex my-2 pt-2 justify-content-end">
          <Button
            type="reset"
            variant="outlined"
            color="secondary"
            className="m-2"
          >
            لغو
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="m-2"
          >
            تایید
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
