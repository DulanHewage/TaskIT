export function fromDateToString(date) {
  // get date in local time zone
  date = new Date(+date);
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
  const dateAsString = date.toISOString().substr(0, 19);
  return dateAsString.split("T")[0];
}
