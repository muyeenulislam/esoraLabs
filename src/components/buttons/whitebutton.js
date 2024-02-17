import React from "react";
import styles from "./styles";
const WhiteButton = (props) => {
  return (
    <button style={styles.whiteButtonStyle} {...props}>
      {props.image && props.imagealign === "left" && (
        <img src={props.image} alt="upload" className="mr-2" />
      )}
      <span className="text-subtitleText" style={styles.fontStyle}>
        {props.text}
      </span>
      {props.image && props.imagealign === "right" && (
        <img src={props.image} alt="upload" className="ml-2" />
      )}
    </button>
  );
};

export default WhiteButton;
