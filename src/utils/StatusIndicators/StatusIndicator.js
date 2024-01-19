import React from "react";
import styles from "./styles";

const StatusIndicator = ({ text, icon }) => {
  let style = "";
  if (text.toLowerCase() === "high") {
    style = styles.statusHigh;
  } else if (text.toLowerCase() === "medium") {
    style = styles.statusMedium;
  } else if (text.toLowerCase() === "low") {
    style = styles.statusLow;
  } else if (text.toLowerCase() === "completed") {
    style = styles.statusCompleted;
  } else if (text.toLowerCase() === "overdue") {
    style = styles.statusOverdue;
  } else if (text.toLowerCase() === "in progress") {
    style = styles.statusInProgress;
  } else {
    style = styles.general;
  }

  return (
    <div style={{ ...style, ...styles.container }}>
      <span>{text}</span>
      {icon && <img src={icon} style={{ marginLeft: "6px" }} alt="icon" />}
    </div>
  );
};

export default StatusIndicator;
