import FormInput from "components/form/formInput";
import { useFormik } from "formik";
import { getFormikFieldProps } from "utils/form";
import Button from "components/core/button";
import { editProfileSchema } from "./editProfileSchema";
import Grid from "components/core/Grid";
import { updateProfile } from "api/users";
import { useMutation } from "react-query";
import { queryClient } from "App";
import { notify } from "components/core/toast";
import { useHistory } from "react-router";

interface IEditProfileFormProps {
  initialValues: IProfileManagement;
}

export interface IProfileManagement {
  firstName: string;
  lastName: string;
  code: string;
}

const EditProfileForm = ({ initialValues }: IEditProfileFormProps) => {
  const history = useHistory();

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getProfile"]);
      notify.success("اطلاعات با موفقیت ویرایش شد.");
      history.replace("../dashboard");
    },
  });
  // const { mutate: updateAvatar } = useMutation(uploadAvatar);
  // const queryClient = useQueryClient();
  const formik = useFormik<IProfileManagement>({
    initialValues: initialValues,
    onSubmit: (values) => {
      mutate(values);
    },
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
            }}
          />

          <FormInput
            {...getFormikFieldProps("lastName", "نام خانوادگی", formik)}
            rootProps={{
              placeholder: "نام خانوادگی",
            }}
          />

          <FormInput
            {...getFormikFieldProps("code", "نام کاربری", formik)}
            rootProps={{
              placeholder: "نام کاربری",
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
