import TRange from "./range";

interface ITime {
  hour: TRange<0, 12>;
  minute: TRange<0, 60>;
  period: "AM" | "PM";
}

export interface I24HTime {
  hour: TRange<0, 24>;
  minute: TRange<0, 60>;
}

export default ITime;
