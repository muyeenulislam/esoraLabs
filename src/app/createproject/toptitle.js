import React from "react";
import styles from "./styles";

const TopTitle = (props) => {
  let title = "";
  let subTitle = "";
  if (props?.pageName === "clientSelect") {
    title = "For whom do you want to create the project?";
    subTitle =
      "Please choose a client from the dropdown list, or create a new client to create a project";
  } else if (props?.pageName === "services") {
    title = "What do you need?";
    subTitle = "Choose your desired service.";
  } else if (props?.pageName === "description") {
    title = "Write us a short description of your project";
    subTitle = "Tell us a short brief about your project ";
  } else if (props?.pageName === "goals") {
    title = "What are the goals of the project?";
    subTitle = "Write down the goals of your project";
  } else if (props?.pageName === "targetAudience") {
    title = "What is the target audience?";
    subTitle = "Select your target audience";
  } else if (props?.pageName === "geographicalScope") {
    title = "What is the geographical scope?";
    subTitle = "Select the geographical scope of your project";
  } else if (props?.pageName === "maturity") {
    title = "What is the maturity of your project?";
    subTitle = "Select the geographical scope of your project";
  } else if (props?.pageName === "startTime") {
    title = "When should the project start?";
    subTitle = "Select the time when do you want to start your project";
  } else if (props?.pageName === "deadline") {
    title = "When does your project need to be completed?";
    subTitle = "Select the time when do you need your project completed";
  } else if (props?.pageName === "otherInfo") {
    title = "What other info should we pass along?";
    subTitle = "Write down the info you want to add";
  } else if (props?.pageName === "documents") {
    title = "Do you have any briefing or relevant documents to share?";
    subTitle = "Please upload relevant files you may have";
  } else if (props?.pageName === "overview") {
    title = "Review and Submit";
    subTitle = "Please review carefully and if you’re satisfied then submit.";
  }
  return (
    <div className="max-w-[660px]">
      <h1 className={styles.header}>{title}</h1>
      <h4 className={styles.subHeader}>{subTitle}</h4>
    </div>
  );
};

export default TopTitle;
