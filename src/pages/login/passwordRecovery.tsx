import {createContext, useState} from "react";
import CreatePasswordPage from "./components/createPassword";
import ForgetPasswordPage from "./components/forgetPassword";
import VerifyEmailPage from "./components/verifyEmail";

export interface IPasswordRecoveryContext {
  step: 1 | 2 | 3;
  setStep: (value: React.SetStateAction<1 | 2 | 3>) => void;
  email: string;
  setEmail: (value: string) => void;
  OTP: string;
  setOTP: (value: React.SetStateAction<string>) => void;
}
export const PasswordRecoveryContext = createContext<IPasswordRecoveryContext>({
  step: 1,
  setStep: () => null,
  email: "",
  setEmail: () => null,
  OTP: "",
  setOTP: () => {},
});

export default function PasswordRecoveryPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  return (
    <PasswordRecoveryContext.Provider
      value={{
        step: step,
        setStep: setStep,
        email: email,
        setEmail: setEmail,
        OTP,
        setOTP,
      }}
    >
      {step === 1 && <ForgetPasswordPage />}
      {step === 2 && <VerifyEmailPage />}
      {step === 3 && <CreatePasswordPage />}
    </PasswordRecoveryContext.Provider>
  );
}
