import DatePicker from "../datePicker";
import {CalendarBold} from "../../icon";
import clsx from "clsx";

export interface ITimespanFilterProps {
  from: Date;
  to: Date;
  setFrom: (d: Date) => any;
  setTo: (d: Date) => any;
  disabled?: boolean;
}

const TimespanFilter = ({
  to,
  setTo,
  from,
  setFrom,
  disabled,
}: ITimespanFilterProps) => {
  return (
    <div>
      <div className={clsx("d-flex flex-column gap-2")}>
        <div>From</div>
        <DatePicker
          disabled={disabled}
          placeholder={"From"}
          icon={CalendarBold}
          value={from}
          onDateSelect={(d) => setFrom(d)}
        />
        <div>To</div>
        <DatePicker
          disabled={disabled}
          placeholder={"To"}
          icon={CalendarBold}
          value={to}
          onDateSelect={(d) => setTo(d)}
        />
      </div>
    </div>
  );
};

export default TimespanFilter;
