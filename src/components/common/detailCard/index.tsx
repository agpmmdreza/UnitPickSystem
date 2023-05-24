import clsx from "clsx";
import {ReactNode} from "react";
import IconChip, {IIconChipProps} from "../iconChip";
import classes from "./styles.module.scss";
import CardContainer, {cardThemeType, cardType} from "../cardContainer";

// Detail Card props type interface
export interface IDetailCardProps {
  type?: cardType; // basic = all white , styled = right is blue , colored = colored background
  theme?: cardThemeType;
  icon: ReactNode;
  title: string;
  subTitle: ReactNode | string;
  text: string | ReactNode;
  chips: IIconChipProps[];
  parentClassName?: string;
}

// component which extend CardContainer Component and display detail
const DetailCard = ({
  type,
  theme,
  icon,
  title,
  subTitle,
  text,
  chips,
  parentClassName,
}: IDetailCardProps) => {
  // render component
  return (
    <CardContainer type={type} theme={theme} className={parentClassName}>
      <div className={clsx(classes.detailCardContainer)}>
        <div className={clsx(classes.detailCardContainer__top)}>
          <div>{icon}</div>
          <div className={clsx(classes.detailCardContainer__title)}>
            {title}
          </div>
        </div>
        <div className={clsx(classes.detailCardContainer__middle)}>
          <div className={clsx(classes.detailCardContainer__sub)}>
            {subTitle}
          </div>
          <div className={clsx(classes.detailCardContainer__text)}>{text}</div>
        </div>
        <div className={clsx(classes.detailCardContainer__bottom)}>
          {renderChips(chips)}
        </div>
      </div>
    </CardContainer>
  );
};

// function to convert chips data to IconChip Component and render it
const renderChips = (chips: IIconChipProps[]) => {
  return chips.map(({ color, icon, texts }, index) => {
    return <IconChip color={color} icon={icon} texts={texts} key={index} />;
  });
};

export default DetailCard;
