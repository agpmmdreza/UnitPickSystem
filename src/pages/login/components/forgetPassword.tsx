import clsx from "clsx";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import { FormikErrors, useFormik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { getFormikFieldProps } from "utils/form";
import LoginLayout from "./loginLayout";
import classes from "./styles.module.scss";
import { PasswordRecoveryContext } from "../passwordRecovery";
import { useMutation } from "react-query";
import { submitForgetPassword } from "api/auth";
import { notify } from "components/core/toast";
import BeatLoader from "react-spinners/BeatLoader";
import yup from "utils/yupExtended";

interface IOnFieldForm {
  email: string;
}

export default function ForgetPasswordPage() {
  const { setStep, email, setEmail } = useContext(PasswordRecoveryContext);
  // eslint-disable-next-line
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const mobileFormat = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  const INITIAL_ONE_FIELD_FORM: IOnFieldForm = {
    email: email,
  };

  let forgetPasswordMutation = useMutation(submitForgetPassword, {
    onSuccess: (_res, values) => {
      setEmail(values.email);
      notify.success("Verification code is sent successfully.");
      setStep(2);
    },
  });

  const formik = useFormik<IOnFieldForm>({
    initialValues: INITIAL_ONE_FIELD_FORM,
    validateOnChange: false,
    onSubmit: (values, actions) => {
      // console.log({ values, actions });
      forgetPasswordMutation.mutate(values);
    },
    validate: (values) => {
      const errors: FormikErrors<IOnFieldForm> = {};

      if (!values.email) {
        errors.email = "Please enter your email";
      } else {
        if (!isNaN(Number(values.email))) {
          //check if the format of phone number is correct
          if (!values.email.match(mobileFormat)) {
            errors.email = "Mobile number is not valid.";
          }
        } else {
          if (!yup.string().email().isValidSync(values.email)) {
            errors.email = "Email is not valid.";
          }
        }
      }
      return errors;
    },
  });
  return (
    <LoginLayout
      form_title="Forget Password"
      form_description="Please Enter your Email Address or Phone Number to receive a
      Verification Code. "
      step={1}
    >
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          rootProps={{
            placeholder: "Email",
          }}
          className="p-0"
          {...getFormikFieldProps("email", "Email", formik)}
        />
        <Button
          className="mt-4 w-100"
          type="submit"
          disabled={forgetPasswordMutation.isLoading}
        >
          {forgetPasswordMutation.isLoading ? (
            <div className="d-flex mt-2">
              <BeatLoader color="#fff" size={10} margin={2} />
            </div>
          ) : (
            "Send"
          )}
        </Button>
        <div className="d-flex mt-3">
          <span>
            <span className={clsx(["me-1", classes.text])}>Back to login?</span>
            <Link className={classes.link} to={"/login"}>
              click here.
            </Link>
          </span>
        </div>
      </form>
    </LoginLayout>
  );
}
