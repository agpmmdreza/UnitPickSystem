import {submitResetPassword} from "api/auth";
import clsx from "clsx";
import Button from "components/core/button";
import FormPassword from "components/form/password";
import {FormikErrors, useFormik} from "formik";
import {useContext} from "react";
import {useMutation} from "react-query";
import {Link} from "react-router-dom";
import {getFormikFieldProps} from "utils/form";
import {PasswordRecoveryContext} from "../passwordRecovery";
import LoginLayout from "./loginLayout";
import classes from "./styles.module.scss";
import {useHistory} from "react-router";
import {notify} from "components/core/toast";
import BeatLoader from "react-spinners/BeatLoader";

interface IOnFieldForm {
  password: string;
  confirmPassword: string;
}

const INITIAL_ONE_FIELD_FORM: IOnFieldForm = {
  password: "",
  confirmPassword: "",
};

export default function CreatePasswordPage() {
  let { OTP, email } = useContext(PasswordRecoveryContext);
  let history = useHistory();
  let createPasswordMutation = useMutation(submitResetPassword, {
    onSuccess: () => {
      notify.success("Your password was changed successfully.");
      history.push("/login");
    },
  });

  const formik = useFormik<IOnFieldForm>({
    initialValues: INITIAL_ONE_FIELD_FORM,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, actions) => {
      createPasswordMutation.mutate({
        email,
        otp: OTP,
        new_password: values.password,
        new_password_confirmation: values.confirmPassword,
      });
    },
    validate: (values) => {
      const errors: FormikErrors<IOnFieldForm> = {};

      if (!values.confirmPassword) {
        errors.confirmPassword = "Password confirmation field is required";
      }

      if (values.password.length < 8) {
        errors.password = "Password length can't be less than 8 characters.";
      } else if (!/^(?=.*[a-z])/.test(values.password)) {
        errors.password = "Password must include at least lowercase letter";
      } else if (!/^(?=.*[A-Z])/.test(values.password)) {
        errors.password = "Password must include at least uppercase letter";
      } else if (!/^(?=.*[!@#?$%^&*])/.test(values.password)) {
        errors.password = "Password must include a special character";
      } else {
        if (
          values.confirmPassword &&
          values.password !== values.confirmPassword
        ) {
          errors.confirmPassword = "Passwords are not the same.";
        }
      }
      return errors;
    },
  });
  return (
    <LoginLayout
      form_title="Create New Password"
      form_description="Your New Password Must Be Different From Previously Used Password."
      step={3}
    >
      <form onSubmit={formik.handleSubmit}>
        <FormPassword
          rootProps={{ placeholder: "New Password" }}
          className="p-0 mt-4"
          {...getFormikFieldProps("password", "New Password", formik)}
        />
        <FormPassword
          rootProps={{ placeholder: "Confirm Password" }}
          className="p-0 mt-4"
          {...getFormikFieldProps(
            "confirmPassword",
            "Confirm Password",
            formik
          )}
        />
        <Button
          className="mt-4 w-100"
          type="submit"
          disabled={createPasswordMutation.isLoading}
        >
          {createPasswordMutation.isLoading ? (
            <div className="d-flex mt-2">
              <BeatLoader color="#fff" size={10} margin={2} />
            </div>
          ) : (
            "Save"
          )}
        </Button>
        <div className="d-flex mt-2">
          <span>
            <span className={clsx(["me-2", classes.text])}>Back to login?</span>
            <Link className={classes.link} to={"/login"}>
              click here.
            </Link>
          </span>
        </div>
      </form>
    </LoginLayout>
  );
}
