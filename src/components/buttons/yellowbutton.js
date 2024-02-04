import React from "react";
import styles from "./styles";
const YellowButton = (props) => {
  return (
    <button
      className="bg-fadedYellow"
      style={styles.yellowButtonStyle}
      {...props}
    >
      {props.image && <img src={props.image} alt="upload" className="mr-2" />}
      <span className="text-primary" style={styles.fontStyle}>
        {props.text}
      </span>
    </button>
  );
};

export default YellowButton;
