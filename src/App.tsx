import React from "react";
import EmailList from "./components/EmailList/EmailList";
import EmailBody from "./components/EmailBody/EmailBody";
import styles from "./app.module.css";
import FilterBar from "./components/FilterBar/FilterBar";
import Loading from "./components/Loading/Loading";
import { useEmailContext } from "./contexts/EmailContext";

const App: React.FC = () => {
  const { loading } = useEmailContext();

  return (
    <main className={styles.container}>
      {loading && <Loading />}
      <FilterBar />
      <section className={styles.mailsContainer}>
        <EmailList />
        <EmailBody />
      </section>
    </main>
  );
};

export default App;
