import React from "react";
import styles from "./styles";
const PrimaryButton = (props) => {
  return (
    <button style={styles.primaryButtonStyle} {...props}>
      <span className="text-white mr-2" style={styles.fontStyle}>
        {props.text}
      </span>
      {props.image && <img src={props.image} alt="upload" />}
    </button>
  );
};

export default PrimaryButton;
