import classes from "./styles.module.scss";
import clsx from "clsx";

type TCardColor = "green" | "orange" | "blue";

type TCardType =
  | "Notification"
  | "Messages"
  | "Doctors"
  | "Staffs"
  | "My Appointments";

export interface IDashboardCardProps {
  count: number | undefined;
  type: TCardType;
  className?: string;
}

export function DashboardCard({ count, type, className }: IDashboardCardProps) {
  //? Switch between types and images by type prop

  return (
    <div
      className={clsx([classes.card__container, className])}
      data-color={"color"}
    >
      <img src={"image"} alt={`dashboard-${type}`} />
      <div className="ms-3">
        <div className={classes.card__title}>{`${
          type !== "My Appointments" ? "New" : ""
        } ${type}`}</div>
        {count !== undefined && (
          <div className={classes.card__count}>
            <span>{!!count && "+"}</span>
            <span>{count}</span>
          </div>
        )}
      </div>
    </div>
  );
}
