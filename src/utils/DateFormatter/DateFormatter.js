const DateFormatter = (dateToFormat) => {
  const date = new Date(dateToFormat);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
export default DateFormatter;
