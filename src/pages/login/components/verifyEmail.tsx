import clsx from "clsx";
import Button from "components/core/button";
import FormInput from "components/form/formInput";
import {useFormik} from "formik";
import {ClipboardEvent, KeyboardEvent, useCallback, useContext, useEffect, useRef, useState,} from "react";
import {Link} from "react-router-dom";
import {getFormikFieldProps} from "utils/form";
import LoginLayout from "./loginLayout";
import classes from "./styles.module.scss";
import {PasswordRecoveryContext} from "../passwordRecovery";
import {useMutation} from "react-query";
import {checkVerificationCode, submitForgetPassword} from "api/auth";
import {notify} from "components/core/toast";
import BeatLoader from "react-spinners/BeatLoader";
import yup from "utils/yupExtended";

// import { padWithZero } from "utils/date";

interface IOnFieldForm {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
  fifthDigit: string;
}

const INITIAL_ONE_FIELD_FORM: IOnFieldForm = {
  firstDigit: "",
  secondDigit: "",
  thirdDigit: "",
  fourthDigit: "",
  fifthDigit: "",
};

const VerifyValidationSchema = yup.object().shape({
  firstDigit: yup.string().required(""),
  secondDigit: yup.string().required(""),
  thirdDigit: yup.string().required(""),
  fourthDigit: yup.string().required(""),
  fifthDigit: yup.string().required(""),
});

export default function VerifyEmailPage() {
  const { email, setStep, setOTP } = useContext(PasswordRecoveryContext);
  // const firstDigitDivRef = useRef<HTMLDivElement>(null);
  // const secondDigitDivRef = useRef<HTMLDivElement>(null);
  // const thirdDigitDivRef = useRef<HTMLDivElement>(null);
  // const fourthDigitDivRef = useRef<HTMLDivElement>(null);
  // const fifthDigitDivRef = useRef<HTMLDivElement>(null);

  let checOTPMutation = useMutation(checkVerificationCode, {
    onSuccess: (_res, values) => {
      setOTP(_res.data.data!);
      setStep(3);
    },
  });

  let forgetPasswordMutation = useMutation(submitForgetPassword, {
    onSuccess: () => {
      notify.success("Verification code is sent successfully.");
    },
  });

  const [timer, setTimer] = useState(0);

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = () => {
    if (!timer) {
      setTimer(59);
    }
  };

  // const formik = useFormik<IOnFieldForm>({
  //   initialValues: INITIAL_ONE_FIELD_FORM,
  //   onSubmit: (values, actions) => {
  //     console.log({ values, actions });
  //     checOTPMutation.mutate({
  //       email,
  //       verification_code: Object.values(values).join(""),
  //     });
  //   },
  //   validate: (values) => {
  //     const errors: FormikErrors<IOnFieldForm> = {};
  //     if (!values.firstDigit) {
  //       errors.firstDigit = " ";
  //     }
  //     if (!values.secondDigit) {
  //       errors.secondDigit = " ";
  //     }
  //     if (!values.thirdDigit) {
  //       errors.thirdDigit = " ";
  //     }
  //     if (!values.fourthDigit) {
  //       errors.fourthDigit = " ";
  //     }
  //     if (!values.fifthDigit) {
  //       errors.fifthDigit = " ";
  //     }
  //     return errors;
  //   },
  // });

  // const handleInputChange = (
  //   value: string,
  //   name:
  //     | "firstDigit"
  //     | "secondDigit"
  //     | "thirdDigit"
  //     | "fourthDigit"
  //     | "fifthDigit",
  //   nextDivRef?: React.RefObject<HTMLDivElement>
  // ) => {
  //   let hasToGoToNext = true;
  //   if (value.length === 1) {
  //     //that is for not letting the user to write more than one letter
  //     formik.setFieldValue(name, value);
  //   } else if (value === "") {
  //     hasToGoToNext = false;
  //     //that is for clearing the input
  //     formik.setFieldValue(name, value);
  //   }
  //   if (nextDivRef && hasToGoToNext) {
  //     const input = nextDivRef.current?.querySelector("input");
  //     input?.focus();
  //     input?.select();
  //   }
  // };

  // const handlePasteText = (e: ClipboardEvent<HTMLInputElement>) => {
  //   const code = e.clipboardData.getData("text");
  //   if (code.length <= 5 && !isNaN(+code)) {
  //     const splittedCode = code.split("");
  //     formik.setFieldValue("firstDigit", splittedCode[0]);
  //     formik.setFieldValue("secondDigit", splittedCode[1]);
  //     formik.setFieldValue("thirdDigit", splittedCode[2]);
  //     formik.setFieldValue("fourthDigit", splittedCode[3]);
  //     formik.setFieldValue("fifthDigit", splittedCode[4]);
  //   }
  // };

  // const submitVerificationCode = async (values: IOnFieldForm) => {
  //   try {
  //     setIsLoading(true);
  //     await auth.logIn({
  //       type: loginType,
  //       verification_code: Object.values(values).join(""),
  //       user_name: getLoginUsername(loginType, formik.values),
  //     });
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  const verifyFormik = useFormik<IOnFieldForm>({
    initialValues: INITIAL_ONE_FIELD_FORM,

    onSubmit: async (values, actions) => {
      console.log({ values, actions });
      // submitVerificationCode(values);
      checOTPMutation.mutate({
        email,
        verification_code: Object.values(values).join(""),
      });
    },
    validationSchema: VerifyValidationSchema,
  });

  const firstDigitRef = useRef<HTMLFormElement>(null);

  const handleInputChange = async (
    e: any,
    nextInputIndex: number,
    fieldName: string
  ) => {
    if (isNaN(e) && e.length === 1) {
      return;
    }
    verifyFormik.setFieldValue(fieldName, e);

    if (e?.trim() && nextInputIndex !== 5) {
      const input = firstDigitRef.current?.querySelectorAll("input");
      input && input[nextInputIndex]?.focus();
    }
  };

  useEffect(() => {
    if (Object.values(verifyFormik.values).join("").length === 5) {
      verifyFormik.submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyFormik.values.fifthDigit]);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    prevInputIndex: number
  ) => {
    const inputs = firstDigitRef.current?.querySelectorAll("input");

    if (e.key === "Backspace" && !inputs?.[prevInputIndex + 1].value) {
      inputs?.[prevInputIndex].focus();
    }
  };

  const handlePasteText = (e: ClipboardEvent<HTMLInputElement>): void => {
    const code = e.clipboardData.getData("text");
    if (code.length <= 5 && !isNaN(+code)) {
      const splittedCode = code.split("");
      verifyFormik.setFieldValue("firstDigit", splittedCode[0]);
      verifyFormik.setFieldValue("secondDigit", splittedCode[1]);
      verifyFormik.setFieldValue("thirdDigit", splittedCode[2]);
      verifyFormik.setFieldValue("fourthDigit", splittedCode[3]);
      verifyFormik.setFieldValue("fifthDigit", splittedCode[4]);
    }
  };

  return (
    <LoginLayout
      form_title="Verify Your Email"
      form_description={`Please Enter the 5 Digit Code Sent to ${email}`}
      step={2}
    >
      <form onSubmit={verifyFormik.handleSubmit} ref={firstDigitRef}>
        <div className="d-flex justify-content-between">
          <div>
            <FormInput
              className={clsx(["p-0", classes.verifyCodeInput])}
              {...getFormikFieldProps("firstDigit", "", verifyFormik)}
              error=""
              onChange={(value) => {
                handleInputChange(value, 1, "firstDigit");
              }}
              rootProps={{
                htmlProps: { onPaste: handlePasteText, maxLength: 1 },
              }}
            />
          </div>
          <div>
            <FormInput
              className={clsx(["p-0", classes.verifyCodeInput])}
              {...getFormikFieldProps("secondDigit", "", verifyFormik)}
              error=""
              onChange={(value) => {
                handleInputChange(value, 2, "secondDigit");
              }}
              rootProps={{
                onKeyDown: (e) => handleKeyDown(e, 0),
                htmlProps: { maxLength: 1 },
              }}
            />
          </div>
          <div>
            <FormInput
              className={clsx(["p-0", classes.verifyCodeInput])}
              {...getFormikFieldProps("thirdDigit", "", verifyFormik)}
              error=""
              onChange={(value) => {
                handleInputChange(value, 3, "thirdDigit");
              }}
              rootProps={{
                onKeyDown: (e) => handleKeyDown(e, 1),
                htmlProps: { maxLength: 1 },
              }}
            />
          </div>
          <div>
            <FormInput
              className={clsx(["p-0", classes.verifyCodeInput])}
              {...getFormikFieldProps("fourthDigit", "", verifyFormik)}
              error=""
              onChange={(value) => {
                handleInputChange(value, 4, "fourthDigit");
              }}
              rootProps={{
                onKeyDown: (e) => handleKeyDown(e, 2),
                htmlProps: { maxLength: 1 },
              }}
            />
          </div>
          <div>
            <FormInput
              className={clsx(["p-0", classes.verifyCodeInput])}
              {...getFormikFieldProps("fifthDigit", "", verifyFormik)}
              error=""
              onChange={(value) => {
                handleInputChange(value, 5, "fifthDigit");
                // in clearing the input we should not focus out
                // if (value !== "") {
                //   fifthDigitDivRef.current?.querySelector("input")?.blur();
                // }
              }}
              rootProps={{
                onKeyDown: (e) => handleKeyDown(e, 3),
                htmlProps: { maxLength: 1 },
              }}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            forgetPasswordMutation.mutate({ email });
            resetTimer();
            verifyFormik.resetForm();
          }}
          size="small"
          variant="text"
          className="px-0 mt-4"
          disabled={!!timer && timer > 0}
        >
          {!!timer && timer > 0 ? `Resend Code in 00:${timer}` : "Resend Code"}
        </Button>
        <Button
          className="mt-4 w-100"
          type="submit"
          disabled={checOTPMutation.isLoading}
        >
          {checOTPMutation.isLoading ? (
            <div className="d-flex mt-2">
              <BeatLoader color="#fff" size={10} margin={2} />
            </div>
          ) : (
            "Verify"
          )}
        </Button>
        <div className="d-flex mt-3">
          <span>
            <span className={clsx(["me-2", classes.text])}>Back to login?</span>
            <Link className={classes.link} to={"/login"}>
              click here.
            </Link>
          </span>
        </div>
        <div className="d-flex mt-2 align-items-baseline">
          <span className={clsx(["me-2", classes.text])}>
            Edit your Information?
          </span>
          <Button
            size="small"
            variant="text"
            className={clsx(["p-0", classes.link])}
            onClick={() => setStep(1)}
          >
            click here.
          </Button>
        </div>
      </form>
    </LoginLayout>
  );
}
