import React from "react";
import styles from "./styles";
const WhiteButton = (props) => {
  return (
    <button style={styles.whiteButtonStyle} {...props}>
      {props.image && <img src={props.image} alt="upload" className="mr-2" />}
      <span className="text-subtitleText" style={styles.fontStyle}>
        {props.text}
      </span>
    </button>
  );
};

export default WhiteButton;
