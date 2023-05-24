import Button from "components/core/button";
import {Timer} from "components/icon";
import React, {useEffect, useState} from "react";
import {convertToTwoDigits} from "utils/form";
import classes from "./styles.module.scss";

type Props = {
  date: string | Date;
};

const TimerButton = ({ date }: Props) => {
  // console.log("log from TimerButton component");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Date.now() - new Date(date).getTime();

      if (diff < 0) {
        // console.log("timer setting");
        setTime(getTime(diff));
      } else {
        // clearing the timer
        // console.log("clear timer from use effect");

        clearTimeout(timer);

        // set the time to received time
        setTime(
          new Date(date).toLocaleTimeString("default", { timeStyle: "short" })
        );
      }
    }, 1000);

    return () => {
      // clearing the timer
      // console.log("clear timer from use effect return");

      clearTimeout(timer);
    };
  }, [date]);

  const [time, setTime] = useState(
    new Date(date).toLocaleTimeString("default", { timeStyle: "short" })
  );
  return (
    <Button className={classes.btn} icon={Timer}>
      <div className={classes.time}>
        <span>{time}</span>
      </div>
    </Button>
  );
};

/**
 * calculate and return the remaining time
 * @param diff the difference of date now and the received date
 * @returns remaining time
 */
function getTime(diff: number) {
  const x = Math.abs(diff);
  let seconds = Math.floor(x / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${days === 0 ? "" : days + "d:"}${hours}:${convertToTwoDigits(
    minutes
  )}:${convertToTwoDigits(seconds)}`;
}

export default React.memo(TimerButton);
