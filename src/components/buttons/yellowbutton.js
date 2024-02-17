import React from "react";
import styles from "./styles";
const YellowButton = (props) => {
  return (
    <button
      className="bg-fadedYellow"
      style={styles.yellowButtonStyle}
      {...props}
    >
      {props.image && props.imagealign === "left" && (
        <img src={props.image} alt="upload" className="mr-2" />
      )}
      <span className="text-primary" style={styles.fontStyle}>
        {props.text}
      </span>
      {props.image && props.imagealign === "right" && (
        <img src={props.image} alt="upload" className="ml-2" />
      )}
    </button>
  );
};

export default YellowButton;
