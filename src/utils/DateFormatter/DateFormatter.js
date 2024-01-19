const DateFormatter = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};
export default DateFormatter;
