import React from "react";
import { useEmailContext } from "../../contexts/EmailContext";
import styles from "./styles.module.css";
import { formatDate } from "../../utils/formatDate";

const EmailBody: React.FC = () => {
  const { selectedEmail } = useEmailContext();

  if (!selectedEmail) {
    return <></>;
  }

  return (
    <article className={styles.container}>
      <section className={styles.header}>
        <div className={styles.avatar}>
          <h2>{selectedEmail?.from?.name?.charAt(0).toUpperCase()}</h2>
        </div>
        <div className={styles.mailSubject}>
          <h2>{selectedEmail?.subject}</h2>
          <p>{formatDate(selectedEmail?.date)}</p>
        </div>
        <button className={styles.favoriteButton}>
          {selectedEmail?.isFavorite
            ? "Remove from favorites"
            : "Mark as favorite"}
        </button>
      </section>
      <section className={styles.mailBody}>
        <p
          dangerouslySetInnerHTML={{
            __html: selectedEmail?.body?.body || "",
          }}
        ></p>
      </section>
    </article>
  );
};

export default EmailBody;
