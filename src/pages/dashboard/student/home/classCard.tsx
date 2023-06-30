import { ReactNode } from "react";
import classes from "./styles.module.scss";

interface IClassCardProps {
  title: string;
  time: string;
  content: ReactNode;
}

const ClassCard = ({ title, time, content }: IClassCardProps) => {
  return (
    <div className={classes.card}>
      <div className="d-flex justify-content-between mb-3">
        <span className={classes.card__title}> {title}</span>
        <span className={classes.card__time}>ساعت {time}</span>
      </div>

      <div className="d-flex">{content}</div>
    </div>
  );
};

export default ClassCard;
