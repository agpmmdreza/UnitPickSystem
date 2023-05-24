import clsx from "clsx";
import classes from "./styles.module.scss";
import {StepNumber} from "./loginLayout";

export interface IStepProps {
  step: 1 | 2 | 3 | 4 | 5;
  count: number;
  onSetStep?: (step: StepNumber) => void;
}

export function Step({ step, count, onSetStep }: IStepProps) {
  const getSteps = () => {
    const steps = [];
    for (let i = 0; i < count; i++) {
      steps.push(
        <div
          key={i}
          className={clsx([
            classes.stepCircle,
            step === i + 1 ? classes.currentStep : null,
            i + 1 < step && classes.selectableStep,
          ])}
          onClick={() => {
            i + 1 < step && onSetStep?.((i + 1) as StepNumber);
          }}
        />
      );
    }
    return steps;
  };
  return (
    <div className="position-relative">
      <div className={classes.stepContainer}>
        <div className={classes.stepCircleContainer}>{getSteps()}</div>
      </div>
    </div>
  );
}
