import React from "react";
import styles from "./styles.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
