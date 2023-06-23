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
