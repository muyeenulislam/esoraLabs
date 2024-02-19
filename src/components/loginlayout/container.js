import React from "react";

import styles from "./styles";

const Container = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/images/esora-logo.svg" alt="logo" className="mr-2" />
        <img src="/images/esora-text-logo.svg" alt="logo" />
      </div>
      <div className={styles.valueContainer}>
        <img
          src="/images/art-right-up.svg"
          alt="logo"
          className="absolute w-[144 px] h-[272px]  right-0 top-0 "
        />
        <img
          src="/images/art-left-down.svg"
          alt="logo"
          className="absolute w-[186px] h-[186px] left-0 bottom-0 "
        />

        {children}
      </div>
    </div>
  );
};

export default Container;
