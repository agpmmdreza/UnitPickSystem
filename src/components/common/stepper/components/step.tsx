import {ReactNode} from "react";

interface IStepProps {
  label?: string;
  children?: ReactNode;
}

const Step = ({ children }: IStepProps) => {
  return <div> {children}</div>;
};

export default Step;
