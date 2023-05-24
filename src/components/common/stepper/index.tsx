import clsx from "clsx";
import Button from "components/core/button";
import {forwardRef, Fragment, ReactNode, Ref, useImperativeHandle, useState,} from "react";
import {BeatLoader} from "react-spinners";
import classes from "./styles.module.scss";

/** Interface for Steps passsed as props to Stepper
 * component (Note: the last step in steps array is for
 * Finished state of stepper, so there is no label needed)
 */
export interface IStep {
  /** Label for Step (for numeric stepper) */
  label?: string;
  /** Content (body) of the step */
  content: ReactNode;
  /** if this property was true, you must use goToNexPage
   * function in onNext property to go to the next page of
   * the stepper */
  manualNext?: boolean;

  /** if this property was true, you must use goToPreviousPage
   * function in onNext property to go to the next page of
   * the stepper */
  manualPrevious?: boolean;
  /** Callbacks for when next or back button clicked */
  onNext?: (goToNextPage?: () => void) => void;
  onBack?: (goToPreviousPage?: () => void) => void;
  /** Next button label (e.g. next, continue, confirm, etc.) */
  nextLabel?: string;
  /** Back button label (e.g. back, cancel, previous, etc.) */
  backLabel?: string;
  hideButtons?: boolean;
  hideNextButton?: boolean;
  hideBackButton?: boolean;
  hideSteps?: boolean;
  isLoading?: boolean; // if it is true both of the back and next button will be disabled and the next button's content will change to beat loader
}

type StepperVariant = "numeric" | "basic";

/** Stepper component props */
interface IStepperProps {
  /** Active step index (default index is 1) */
  activeStep?: number;
  steps: IStep[];
  children?: ReactNode[];
  variant?: StepperVariant;
}
export interface IStepperRef {
  goNext: () => void;
}
const Stepper = (
  { steps, activeStep = 1, variant = "numeric" }: IStepperProps,
  ref: Ref<IStepperRef>
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(activeStep - 1);

  const currentStep = steps[currentStepIndex];

  useImperativeHandle(
    ref,
    () => ({
      goNext: () => {
        goToNextPage();
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStepIndex]
  );

  /** Function to move to the next step on next button click */
  const goToNextPage = () => {
    currentStepIndex < steps.length - 1 &&
      setCurrentStepIndex((prevStep) => prevStep + 1);
  };

  /** Function to move to the previous step on back button click */
  const goToPreviousPage = () => {
    currentStepIndex > 0 && setCurrentStepIndex((prevStep) => prevStep - 1);
  };

  /** Function that returns Step based on variant */
  const getStep = (step: IStep, index: number) => {
    return (
      <Fragment key={index}>
        <div className={classes.stepper__step}>
          <div
            className={clsx({
              ...(variant === "numeric" && {
                [classes.stepper__numericCircle]: true,
                [classes.stepper__numericActive]: index === currentStepIndex,
                [classes.stepper__numericCompleted]: index < currentStepIndex,
              }),

              ...(variant === "basic" && {
                [classes.stepper__circle]: true,
                [classes.stepper__active]:
                  currentStepIndex === steps.length - 1
                    ? index === currentStepIndex - 1
                    : index === currentStepIndex,
              }),
            })}
          >
            {variant === "numeric" && index + 1}
          </div>

          {variant === "numeric" && (
            <span className={classes.stepper__label}>{step.label}</span>
          )}
        </div>
        {index !== steps.length - 2 && variant === "numeric" && (
          <div
            className={clsx(
              classes.stepper__connector,
              index < currentStepIndex && classes.stepper__connectorActive
            )}
          />
        )}
      </Fragment>
    );
  };

  return (
    <div>
      {!currentStep?.hideSteps && (
        <div
          className={clsx(
            variant === "numeric"
              ? classes.stepper__numericContainer
              : classes.stepper__basicContainer
          )}
        >
          {steps.map(
            (step, index) => index < steps.length - 1 && getStep(step, index)
          )}
        </div>
      )}

      <div className="py-3"> {currentStep?.content} </div>

      {!currentStep?.hideButtons && (
        <div className={classes.stepper__footer}>
          {!currentStep?.hideBackButton && (
            <Button
              disabled={!!currentStep.isLoading}
              onClick={() => {
                // passing goToPreviousPage function to onNext
                // function (Note: you can use this for
                // manually moving to the next step e.g. after
                // form submit, etc.)
                currentStep?.onBack && currentStep.onBack(goToPreviousPage);
                // if manual next was false then go to next
                // step automatically
                !currentStep.manualPrevious && goToPreviousPage();
              }}
              className="me-2"
              color="secondary"
              variant="outlined"
            >
              {currentStep?.backLabel || "Back"}
            </Button>
          )}
          {!currentStep.hideNextButton && (
            <Button
              disabled={!!currentStep.isLoading}
              onClick={() => {
                // passing goToNextPage function to onNext
                // function (Note: you can use this for
                // manually moving to the next step e.g. after
                // form submit, etc.)
                currentStep?.onNext && currentStep.onNext(goToNextPage);
                // if manual next was false then go to next
                // step automatically
                !currentStep.manualNext && goToNextPage();
              }}
            >
              {!!currentStep.isLoading ? (
                <BeatLoader color="#fff" size={10} margin={2} />
              ) : (
                currentStep?.nextLabel || "Continue"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Stepper);
