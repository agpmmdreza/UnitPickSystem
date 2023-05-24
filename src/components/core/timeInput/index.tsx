import clsx from "clsx";
import {ArrowDownLinear} from "components/icon/arrowDown";
import {ITime, TRange} from "interfaces";
import {FocusEvent, HTMLProps, useEffect, useRef, useState} from "react";
import classes from "./styles.module.scss";

export interface ITimeInputProps {
  name: string;
  onChange: (v: ITime) => void;
  defaultTime?: ITime;
  size: "small" | "normal" | "big";
  htmlProps?: HTMLProps<HTMLDivElement>;
  readOnly?: boolean;
}

// function to convert number to two-digit number
const padNumber = (num: number) => {
  return num >= 10 ? String(num) : `0${num}`;
};

// input component for input in time format
function TimeInput({
  name,
  onChange,
  defaultTime,
  size,
  readOnly,
  htmlProps,
}: ITimeInputProps) {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [disable, setDisable] = useState({ up: false, down: false });

  const selectedInput = useRef<HTMLInputElement>();
  // set time
  useEffect(() => {
    if (!!defaultTime) {
      setHour(padNumber(defaultTime.hour));
      setMinute(padNumber(defaultTime.minute));
      setPeriod(defaultTime.period);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTime]);
  // check disable need in time change
  useEffect(() => {
    handleDisables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute]);
  // function to handle arrows change
  const handleArrowChange = (inc: number) => {
    if (selectedInput.current) {
      let name = selectedInput.current.name;
      let value = Number(selectedInput.current.value) + inc;
      handleChange(String(value), name as "hour" | "minute");
      // selectedInput.current.focus();
    } else {
      let name = "hour";
      let value = Number(hour) + inc;
      handleChange(String(value), name as "hour" | "minute");
    }
  };

  // focus handler
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    selectedInput.current = e.target;
    handleDisables();
  };

  // function to change time on change event
  const handleChange = (value: string, type: "hour" | "minute") => {
    if (type === "hour") {
      let numValue = Number(value);
      if (!isNaN(numValue) && numValue <= 11 && numValue >= 0) {
        setHour(padNumber(numValue));
        onChange({
          hour: numValue as TRange<1, 12>,
          minute: Number(minute) as TRange<0, 60>,
          period,
        });
      }
    } else if (type === "minute") {
      let numValue = Number(value);
      if (!isNaN(numValue) && numValue <= 59 && numValue >= 0) {
        setMinute(padNumber(numValue));
        onChange({
          hour: Number(hour) as TRange<0, 12>,
          minute: numValue as TRange<0, 60>,
          period,
        });
      }
    }
  };
  // function to change period of time
  const handlePeriodChange = () => {
    const next = period === "AM" ? "PM" : "AM";
    setPeriod(next);
    onChange({
      hour: Number(hour) as TRange<0, 11>,
      minute: Number(minute) as TRange<0, 60>,
      period: next,
    });
  };
  // function to disable arrow when reached boundaries (0 or 12 in hour or 59 in minute)
  const handleDisables = () => {
    let name = "hour";
    let num: number;
    if (!!selectedInput.current) {
      name = selectedInput.current.name;
    }
    if (name === "hour") {
      num = Number(hour);
    } else {
      num = Number(minute);
    }
    if ((name === "hour" && num === 12) || (name === "minute" && num === 59))
      setDisable((prev) => ({ down: false, up: true }));
    else if (num === 0) setDisable((prev) => ({ up: false, down: true }));
    else setDisable((prev) => ({ down: false, up: false }));
  };
  // render component
  return (
    <div
      className={classes.timeRoot}
      data-size={size}
      data-testid="test-time"
      {...htmlProps}
    >
      <input
        name="hour"
        onChange={(e) => handleChange(e.target.value, "hour")}
        value={hour}
        onFocus={handleFocus}
        className={classes.numberInput}
        data-testid="test-time-hour"
        readOnly={readOnly}
      />
      :
      <input
        name="minute"
        onChange={(e) => handleChange(e.target.value, "minute")}
        value={minute}
        onFocus={handleFocus}
        className={classes.numberInput}
        data-testid="test-time-minute"
        readOnly={readOnly}
      />
      <div
        className={classes.periodInput}
        onClick={() => !readOnly && handlePeriodChange()}
      >
        {period}
      </div>
      <div className={classes.arrowsContainer}>
        <ArrowDownLinear
          className={clsx([classes.arrowUp, classes.arrow])}
          data-disabled={disable.up && !readOnly}
          data-testid="test-arrow-up"
          onClick={() => !disable.up && !readOnly && handleArrowChange(+1)}
        />
        <ArrowDownLinear
          className={classes.arrow}
          data-disabled={disable.down && !readOnly}
          data-testid="test-arrow-down"
          onClick={() => !disable.down && !readOnly && handleArrowChange(-1)}
        />
      </div>
    </div>
  );
}

TimeInput.defaultProps = {
  size: "normal",
};

export default TimeInput;
