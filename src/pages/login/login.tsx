import clsx from "clsx";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import FormPassword from "components/form/password";
import {FrameBold} from "components/icon";
import {useFormik} from "formik";
import {Link, useHistory} from "react-router-dom";
import {getFormikFieldProps} from "utils/form";
import LoginLayout from "./components/loginLayout";
import classes from "./components/styles.module.scss";
import {useAuth} from "hooks/useAuth";
import {UserLoginType} from "api/types/userTypes";
import {useEffect, useState,} from "react";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";
import yup from "utils/yupExtended";
import {IPhoneNumber} from "interfaces";

interface IOnFieldForm {
  username: string;
  password: string;
  remember: boolean;
  mobile: IPhoneNumber;
}

const INITIAL_ONE_FIELD_FORM: IOnFieldForm = {
  username: "",
  password: "",
  remember: false,
  mobile: { code: "98", number: "" },
};

export default function LoginPage() {
  const auth = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState(UserLoginType.Email);
  const [step, setStep] = useState<1 | 2>(1);

  // const LoginValidationSchema =

  const getSchema = () => {
    return yup.object().shape({
      ...(loginType === UserLoginType.Email && {
        username: yup.string().min(4).required("This field is required"),
      }),
      ...(loginType === UserLoginType.Mobile && {
        mobile: yup.object().phoneNumber(),
      }),
      password: yup.string().min(4).required("This field is required"),
    });
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      toast.success("Login Successful");
      history.replace(`/panel/${auth.role?.toLowerCase()}/`);
    }
  }, [auth.isLoggedIn, auth.role, history]);

  // eslint-disable-next-line
  // const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const mobileFormat = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const formik = useFormik<IOnFieldForm>({
    initialValues: INITIAL_ONE_FIELD_FORM,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      try {
        setIsLoading(true);
        await auth.logIn({
          code: values.username,
          password: values.password,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    validationSchema: getSchema(),
  });

  return (
    <LoginLayout
      hasFooter
      form_title="UnitSelection"
      form_description={
        step === 1
          ? "Please enter your username and password."
          : "Please enter 5 digit code."
      }
      stepsCount={2}
      step={step}
    >
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          rootProps={{
            icon: FrameBold,
            placeholder: "Username (Email)",
            disabled: isLoading,
          }}
          className="p-0"
          {...getFormikFieldProps("username", "Username", formik)}
        />

        <FormPassword
          rootProps={{ placeholder: "Password", disabled: isLoading }}
          className="p-0 mt-4"
          {...getFormikFieldProps("password", "Password", formik)}
        />

        <div className="d-flex mt-4 pt-2">
          <Link
            className={clsx([classes.link, "ms-auto"])}
            to="/forget-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Button disabled={isLoading} className="mt-3 w-100" type="submit">
          {isLoading ? (
            <div className="d-flex mt-2">
              <BeatLoader color="#fff" size={10} margin={2} />
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
        <div className="d-flex mt-3">
          <span>
            <span className={clsx(["me-1", classes.text])}>
              Don’t have an account?
            </span>
            {/* <Dropdown anchor="right">
              <span
                className={clsx([classes.link, "pe-2"])}
                id="login-sign-up-toggle-btn"
              >
                Sign Up
              </span>
              <DropdownMenu
                anchor="right-bottom"
                toggleId="login-sign-up-toggle-btn"
              >
                <DropdownItem
                  onClick={() => history.replace(`doctor-registration`)}
                >
                  Doctor
                </DropdownItem>
                <DropdownItem
                  onClick={() => history.replace(`staff-registration`)}
                >
                  Staff
                </DropdownItem>
                <DropdownItem
                  onClick={() => history.replace(`patient-registration`)}
                >
                  Patient
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </span>
        </div>
      </form>
    </LoginLayout>
  );
}

// function LoginFirstStepForm() {
//   return <div></div>;
// }
