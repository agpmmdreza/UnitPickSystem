import CardContainer from "../cardContainer";
import clsx from "clsx";
import classes from "./styles.module.scss";

export interface IProfileInfoCardProps {
  title: string;
  text: string | null | undefined;
  icon: any;
  color: string;
  className?: string;
  parentClassname?: string;
}

const ProfileInfoCard = ({
  title,
  text,
  icon: Icon,
  color,
  className,
  parentClassname,
}: IProfileInfoCardProps) => {
  return (
    <CardContainer padding={"none"} className={parentClassname}>
      <div className={clsx(classes.profileCard, className)}>
        <div
          /*   style={{ backgroundColor: color }}*/
          className={clsx(classes.profileCard__icon)}
        >
          <Icon />
        </div>
        <div className={clsx(classes.profileCard__info)}>
          <div className={clsx(classes.profileCard__title)}>{title}:</div>
          <div className={clsx(classes.profileCard__text)}>
            {!!text ? text : "_ _ _"}
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default ProfileInfoCard;
