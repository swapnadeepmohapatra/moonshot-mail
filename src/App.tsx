import React from "react";
import EmailList from "./components/EmailList/EmailList";
import EmailBody from "./components/EmailBody/EmailBody";
import styles from "./app.module.css";
import FilterBar from "./components/FilterBar/FilterBar";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      <FilterBar />
      <section className={styles.mailsContainer}>
        <EmailList />
        <EmailBody />
      </section>
    </main>
  );
};

export default App;
