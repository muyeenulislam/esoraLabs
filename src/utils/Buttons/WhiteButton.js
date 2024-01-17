import React from "react";
import styles from "./styles";
const WhiteButton = ({ text, image }) => {
  return (
    <button style={styles.whiteButtonStyle}>
      {image && <img src={image} alt="upload" className="mr-2" />}
      <span className="text-subtitleText" style={styles.fontStyle}>
        {text}
      </span>
    </button>
  );
};

export default WhiteButton;
