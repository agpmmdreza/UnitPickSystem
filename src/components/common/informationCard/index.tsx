import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";
import CardContainer, {
  cardPadding,
  cardThemeType,
  cardType,
} from "../cardContainer";
import classes from "./styles.module.scss";

// InformationCard props type interface
export interface IInformationCardProps extends PropsWithChildren<any> {
  type?: cardType;
  theme?: cardThemeType;
  icon: ReactNode;
  title: string;
  customClassname?: string; // for custom styles
  id?: string;
  padding?: cardPadding;
  parentClassName?: string;
}

// InformationCard component for displaying info under card with icon and title
const InformationCard = ({
  type,
  theme,
  title,
  icon,
  customClassname,
  id,
  children,
  padding,
  parentClassName,
}: IInformationCardProps) => {
  // render component
  return (
    <CardContainer
      type={type}
      theme={theme}
      padding={padding}
      className={parentClassName}
    >
      <div
        className={clsx(classes.informationCard, classes.fw, customClassname)}
        id={id}
      >
        <div className={clsx(classes.informationCard__head)}>
          <div>{icon}</div>
          <div className={clsx(classes.informationCard__title)}>{title}</div>
        </div>
        <div className={clsx(classes.fw)}>{children}</div>
      </div>
    </CardContainer>
  );
};

// component default props
InformationCard.defaultProps = {
  type: "basic",
};

export default InformationCard;
