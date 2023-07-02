import CardContainer, { cardThemeType, cardType } from "../cardContainer";
import classes from "./styles.module.scss";
import Avatar from "components/core/avatar";
import { TrashIcon } from "@heroicons/react/24/outline";

interface props {
  type?: cardType;
  theme?: cardThemeType;
}
interface avatarProps {
  src: string;
  name: string;
}
export interface ListCardProps extends props {
  number?: number;
  title?: string;
  info?: string;
  text?: string;
  onDelete?: () => any;
  className?: string;
  avatar?: avatarProps;
}

const ListCard = ({
  className,
  number,
  title,
  text,
  theme,
  type,
  info,
  avatar,
  onDelete,
}: ListCardProps) => {
  return (
    <CardContainer
      type={type}
      theme={theme}
      padding={"none"}
      className={className}
    >
      <div className={classes.listCard}>
        <div className={classes.listCard__head}>
          {avatar && <Avatar name={avatar.name} src={avatar.src} size="big" />}
          {number !== undefined && (
            <div className={classes.listCard__number}>{number}</div>
          )}
          {!!title && <div className={classes.listCard__title}>{title}</div>}
        </div>
        {info && (
          <div className={classes.listCard__text}>
            <span className={classes.listCard__textDark}>{info + ": "}</span>
            {text}
          </div>
        )}
        {onDelete && (
          <div
            className={classes.listCard__delete}
            onClick={() => {
              if (onDelete) {
                onDelete();
              }
            }}
          >
            <TrashIcon />
          </div>
        )}
      </div>
    </CardContainer>
  );
};

export default ListCard;
