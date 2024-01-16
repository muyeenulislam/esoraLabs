import React from "react";

import styles from "./styles";

const Content = ({ children }) => {
  return <div className={styles.contentContainer}>{children}</div>;
};

export default Content;
