const DateFormatterLong = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};

export default DateFormatterLong;
