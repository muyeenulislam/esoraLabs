import React from "react";

const StatusIndicator = ({ text }) => {
  console.log(text);
  let style = "";
  if (text.toLowerCase() === "high") {
    style =
      "text-statusHighText py-[9px] px-[12px] bg-high rounded-[16px] flex justify-center items-center ";
  } else if (text.toLowerCase() === "medium") {
    style =
      "text-statusMediumText py-[9px] px-[12px] bg-medium rounded-[16px] flex justify-center items-center";
  } else if (text.toLowerCase() === "low") {
    style =
      "text-statusLowText py-[9px] px-[12px] bg-low rounded-[16px] flex justify-center items-center";
  } else if (text.toLowerCase() === "completed") {
    style =
      "text-successText py-[9px] px-[12px] bg-success rounded-[16px] flex justify-center items-center";
  } else if (text.toLowerCase() === "overdue") {
    style =
      "text-overdueText py-[9px] px-[12px] bg-overdue rounded-[16px] flex justify-center items-center";
  } else {
    style =
      "text-subtitleText py-[9px] px-[12px] bg-greyStatus rounded-[16px] flex justify-center items-center";
  }

  return <div className={style}>{text}</div>;
};

export default StatusIndicator;
