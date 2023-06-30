import moment from "moment";

// function that set time out for specified time
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertToDateAndTime(d: Date | string) {
  var date = new Date(d);
  var formattedDate = date.toLocaleDateString(); // Get the date in local format
  var hour = date.getHours();
  var minute = date.getMinutes();

  // Pad single-digit hour/minute with leading zero
  var formattedHour = hour.toString().padStart(2, "0");
  var formattedMinute = minute.toString().padStart(2, "0");

  var formattedDateTime =
    formattedHour + ":" + formattedMinute + " " + formattedDate;
  return formattedDateTime;
}

function getJalaliDayIndex(day: string) {
  // start of week is Monday
  switch (day) {
    case "شنبه":
      return 6;
    case "یکشنبه":
      return 7;
    case "دوشنبه":
      return 1;
    case "سه شنبه":
      return 2;
    case "چهارشنبه":
      return 3;
    case "پنجشنبه":
      return 4;
    case "جمعه":
      return 5;
    default:
      return 0;
  }
}

export function isClassJoinTime(dayNames: string[]) {
  const mappedDayIndexes = dayNames.map((d) => getJalaliDayIndex(d));
  return mappedDayIndexes.some((i) => i === moment("2023-07-01").isoWeekday());
}
