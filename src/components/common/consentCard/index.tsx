import {PropsWithChildren, ReactNode} from "react";
import CardContainer, {cardThemeType, cardType} from "../cardContainer";
import RadioButton from "../../core/radioButton";
import clsx from "clsx";
import classes from "./styles.module.scss";

// Consent Card Props Type Interface
export interface IConsentCardProps extends PropsWithChildren<any> {
  type?: cardType;
  theme?: cardThemeType;
  icon: ReactNode;
  title: string;
  text?: string;
  content: string;
  contentResult: string;
  contentResultType?: "success" | "warning" | "danger";
  options?: string[]; // options for radio button
  selectedOptions?: string[]; // options that want to be selected in options props;
}

// ConsentCard component for showing consent info
const ConsentCard = ({
  type,
  theme,
  icon,
  title,
  text,
  content,
  contentResult,
  contentResultType,
  options,
  selectedOptions,
  children,
}: IConsentCardProps) => {
  // render component
  return (
    <CardContainer type={type} theme={theme}>
      <div className={clsx(classes.consent)}>
        <div className={clsx(classes.consent__top)}>
          <div>{icon}</div>
          <div className={clsx(classes.consent__title)}>{title}</div>
        </div>
        {text && <div className={clsx(classes.consent__middle)}>{text}</div>}
        <div className={clsx(classes.consent__bottom)}>
          <div className={clsx(classes.consent__content)}>
            <div className={clsx(classes.consent__text)}>{content}</div>
            <div
              className={clsx(
                classes.consent__badge,
                contentResultType === "success" && classes.pos,
                contentResultType === "warning" && classes.warn,
                contentResultType === "danger" && classes.neg
              )}
            >
              {contentResult}
            </div>
          </div>
          <div className={clsx(classes.consent__options)}>
            {options && renderOptions(options, selectedOptions)}
          </div>
        </div>
        {children}
      </div>
    </CardContainer>
  );
};

// function to convert options to radio button jsx and render
const renderOptions = (options: string[], selectedOptions?: string[]) => {
  return options.map((option, index) => {
    return (
      <RadioButton
        title={option}
        isSelected={selectedOptions?.includes(option)}
        clickable={false}
        key={index}
      />
    );
  });
};

// component default props
ConsentCard.defaultProps = {
  type: "styled",
  isContentResultPositive: true,
};

export default ConsentCard;
