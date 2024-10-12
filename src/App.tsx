import React from "react";
import EmailList from "./components/EmailList/EmailList";
import EmailBody from "./components/EmailBody/EmailBody";
import styles from "./app.module.css";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      <EmailList />
      <EmailBody />
    </main>
  );
};

export default App;
