import React from "react";
import styles from "./styles";
const PrimaryButton = ({ text, image }) => {
  return (
    <button style={styles.primaryButtonStyle}>
      <span className="text-white mr-2" style={styles.fontStyle}>
        {text}
      </span>
      {image && <img src={image} alt="upload" />}
    </button>
  );
};

export default PrimaryButton;
