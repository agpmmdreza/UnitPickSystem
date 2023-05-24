import Avatar from "components/core/avatar";
import Button from "components/core/button";
import classes from "./styles.module.scss";

export interface IDashboardMessageCardProps {
  dateTime: string;
  name: string;
  email: string;
  image?: string;
  country?: string;
  onClick?: () => void;
  type?: "notif" | "message";
}

//? The cards in main screen (dashboard) whether notifications or messages

export function DashboardMessageCard({
  dateTime,
  email,
  name,
  image,
  country,
  onClick,
  type,
}: IDashboardMessageCardProps) {
  return (
    <div className={classes.messageCard__container}>
      <div className={classes.messageCard__dateTime}>{dateTime}</div>
      <div className="d-flex flex-column align-items-center mx-auto">
        <div className={classes.messageCard__avatarContainer}>
          <Avatar name={name} src={image} size="big" />
          <div className="position-relative">
            <div className={classes.messageCard__avatarContainer__country}>
              {type === "message" && !!country && (
                <img src={country} alt="country" width={30} height={20} />
              )}
            </div>
          </div>
        </div>
        <div className={classes.messageCard__name}>{name}</div>
        <div className={classes.messageCard__email}>{email}</div>
      </div>
      <Button onClick={onClick} className={classes.messageCard__button}>
        View Messages
      </Button>
    </div>
  );
}
