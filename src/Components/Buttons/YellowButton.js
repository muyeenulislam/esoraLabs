import React from "react";
import styles from "./styles";
const YellowButton = ({ text, image }) => {
  return (
    <button className="bg-fadedYellow" style={styles.yellowButtonStyle}>
      {image && <img src={image} alt="upload" className="mr-2" />}
      <span className="text-primary" style={styles.fontStyle}>
        {text}
      </span>
    </button>
  );
};

export default YellowButton;
