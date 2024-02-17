import React from "react";

import styles from "./styles";

const Container = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/images/esora-logo.svg" alt="logo" className="mr-2" />
        <img src="/images/esora-text-logo.svg" alt="logo" />
      </div>
      <div className={styles.valueContainer}>{children}</div>
    </div>
  );
};

export default Container;