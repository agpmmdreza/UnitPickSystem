import CardContainer, {ICardContainerProps} from "../cardContainer";
import clsx from "clsx";
import classes from "./styles.module.scss";

export interface ILabelCardProps extends ICardContainerProps {
  title: string;
  answer: "Yes" | "No" | string;
  content?: string;
}

const LabelCard = ({
  title,
  answer,
  content,
  type,
  theme,
}: ILabelCardProps) => {
  return (
    <CardContainer type={type} theme={theme} padding={"none"}>
      <div className={clsx(classes.labelCard)}>
        <div className={clsx(classes.labelCard__head)}>
          <span
            className={clsx(
              classes.labelCard__secondary,
              classes.labelCard__bold
            )}
          >
            {title}{" "}
          </span>
          <span
            className={clsx(
              classes.labelCard__bold,
              answer === "Yes"
                ? classes.labelCard__danger
                : classes.labelCard__gray
            )}
          >
            {answer || "- - -"}
          </span>
        </div>
        <div className={clsx(classes.labelCard__gray)}>{content}</div>
      </div>
    </CardContainer>
  );
};

export default LabelCard;
