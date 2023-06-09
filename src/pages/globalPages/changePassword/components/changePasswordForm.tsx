import Button from "components/core/button";
import { FormikErrors, useFormik } from "formik";
import { getFormikFieldProps } from "utils/form";
import FormPassword from "components/form/password";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import { validatePassword } from "utils/validation";
import NotificationAlert from "components/core/notificationAlert";
import { useState } from "react";
import { notify } from "components/core/toast";
import Grid from "components/core/Grid";
import { changePassword } from "api/users";

interface IFieldTypes {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const INITIAL_VALUES = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePasswordForm() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { mutate, isLoading } = useMutation(changePassword);
  const history = useHistory();
  const formik = useFormik<IFieldTypes>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values) => {
      setIsAlertOpen(true);
    },
    validate: (values) => {
      const errors: FormikErrors<IFieldTypes> = {};

      if (!values.confirmPassword) {
        errors.confirmPassword = "Password confirmation field is required";
      }
      if (!values.oldPassword) {
        errors.oldPassword = "Old Password field is required";
      }
      const passwordValidation = validatePassword(values.newPassword);
      if (passwordValidation !== "") {
        errors.newPassword = passwordValidation;
      } else {
        if (
          values.confirmPassword &&
          values.newPassword !== values.confirmPassword
        ) {
          errors.confirmPassword = "Passwords are not the same.";
        }
      }
      return errors;
    },
    // validationSchema: changePasswordSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handleMutation = () => {
    mutate(
      {
        currentPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
      },
      {
        onSuccess: () => {
          notify.success("Password is changed successfully.");
          history.goBack();
        },
      }
    );
    setIsAlertOpen(false);
  };

  return (
    <div className="container p-0">
      <form
        className="mt-5"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <Grid>
          <FormPassword
            className="ps-0"
            {...getFormikFieldProps("oldPassword", "پسورد فعلی", formik)}
            rootProps={{
              placeholder: "پسورد فعلی",
            }}
          />
          <FormPassword
            {...getFormikFieldProps("newPassword", "پسورد جدید", formik)}
            rootProps={{
              placeholder: "پسورد جدید",
            }}
          />
          <FormPassword
            {...getFormikFieldProps(
              "confirmPassword",
              "تایید پسورد جدید",
              formik
            )}
            rootProps={{
              placeholder: "تایید پسورد جدید",
            }}
          />
        </Grid>
        <div className="d-flex justify-content-end mt-5 pt-5">
          <Button
            type="reset"
            variant="outlined"
            color="secondary"
            className="m-2"
            onClick={() => history.replace("./dashboard")}
          >
            لغو
          </Button>

          <Button
            variant="contained"
            color="primary"
            className="m-2"
            disabled={isLoading}
            onClick={() => {
              formik.submitForm();
            }}
          >
            {isLoading ? (
              <div className="d-flex mt-2">
                <BeatLoader color="#fff" size={10} margin={2} />
              </div>
            ) : (
              "تغییر پسورد"
            )}
          </Button>
        </div>
      </form>
      <NotificationAlert
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onApprove={handleMutation}
        title="Confirm Password Change"
        contnet={"Are you sure you want to change password?"}
      />
    </div>
  );
}

export default ChangePasswordForm;
