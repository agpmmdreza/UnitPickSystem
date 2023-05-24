import Calendar, {CalendarProps, ViewCallbackProperties,} from "react-calendar";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import {ArrowLeftLinear, ArrowRightLinear} from "../../icon";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import "swiper/css/free-mode";
import "swiper/css";

interface ISwiperItem {
  label: string;
  newDate: Date;
}

/** Swiper items for selecting ready dates */
const swiperItems: ISwiperItem[] = [
  {
    label: "Today",
    newDate: new Date(),
  },
  {
    label: "Tomorrow",
    newDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  },
  {
    label: "Next Week",
    newDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    label: "Next Month",
    newDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
  },
];

// TimePicker props type interface
export interface ITimePickerProps extends CalendarProps {
  /** These next two props are for handling date state outside of component */
  date?: Date | [Date | null, Date | null] | null;
  onSetDate?: Dispatch<SetStateAction<Date | [Date | null, Date | null]>>;
  /** Fucntion called when a date selected from time picker */
  onDateSelected?: (selectedDate: Date | [Date | null, Date | null]) => void;
  /** when ready dates clicked (for changing current active date) */
  onReadyDateClicked?: (date: Date) => void;

  /** Hide ready dates (swiper) */
  hideSwiper?: boolean;
  /** Ready dates on side of the timePicker (instead of bottom) */
  sideSwiper?: boolean;
  availableDates?: string[];
  allDates?: string[];
  selectedDates?: Date[];
}

// time picker component for selecting time at specific date
const TimePicker = ({
  date,
  onDateSelected,
  hideSwiper,
  sideSwiper,
  onReadyDateClicked,
  availableDates,
  allDates,
  selectedDates,
  ...props
}: ITimePickerProps) => {
  const [localDate, setLocalDate] = useState<
    Date | [Date | null, Date | null]
  >();
  const [localActiveDate, setLocalActiveDate] = useState<Date>(new Date());

  const onActiveDateChange = ({ activeStartDate }: ViewCallbackProperties) => {
    setLocalActiveDate(activeStartDate);
  };

  // call on date selected function whenever it updates
  useEffect(() => {
    if (localDate) {
      !!localDate && onDateSelected?.(localDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localDate]);

  // render component
  return (
    <div
      className={clsx(
        classes.timePicker__calendarContainer,
        sideSwiper && classes.timePicker__calendarContainerSide
      )}
    >
      <div
        className={clsx(
          classes.timePicker__calendar,
          sideSwiper && classes.timePicker__sideCalendar
        )}
      >
        <Calendar
          tileClassName={({ activeStartDate, date, view }) => {
            if (
              view === "month" &&
              selectedDates?.some((d) => {
                return d.getTime() === date.getTime();
              })
            ) {
              return "react-calendar__tile--active";
            }

            if (view === "month") {
              return classes.av;
            }

            return "";
          }}
          value={date || localDate}
          onChange={setLocalDate}
          // onClickDay={() => setLocalDate([null, null])}
          navigationLabel={({ label }) => {
            return label.replace(" ", ", ").replace(", –", " - ");
          }}
          nextLabel={<ArrowRightLinear />}
          prevLabel={<ArrowLeftLinear />}
          activeStartDate={localActiveDate}
          onActiveStartDateChange={onActiveDateChange}
          {...props}
        />
      </div>

      {!hideSwiper && (
        <div
          className={clsx(
            classes.timePicker__divider,
            classes.timePicker__dividerM
          )}
          date-type={sideSwiper ? "vertical" : "horizontal"}
        />
      )}

      {!hideSwiper && (
        <div
          className={clsx(
            classes.timePicker__swiperContainer,
            sideSwiper && classes.timePicker__sideSwiperContainer
          )}
        >
          {sideSwiper ? (
            <div className={classes.timePicker__sideDaysContainer}>
              {swiperItems.map((item, index) => (
                <div
                  key={index}
                  className={clsx(classes.timePicker__dateLabels)}
                  onClick={() => {
                    setLocalDate(item.newDate);
                    onReadyDateClicked?.(item.newDate);
                    setLocalActiveDate(item.newDate);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={"auto"}
              modules={[FreeMode]}
            >
              {swiperItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={clsx(classes.timePicker__dateLabels)}
                    onClick={() => {
                      setLocalDate(item.newDate);
                      setLocalActiveDate(item.newDate);
                    }}
                  >
                    {item.label}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
