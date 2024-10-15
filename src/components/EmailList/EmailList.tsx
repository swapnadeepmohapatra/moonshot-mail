import React from "react";
import { useEmailContext } from "../../contexts/EmailContext";
import EmailListItem from "../EmailListItem/EmailListItem";
import styles from "./styles.module.css";

const EmailList: React.FC = () => {
  const {
    emails,
    selectEmail,
    selectedEmail,
    totalEmails,
    hasPreviousPage,
    hasNextPage,
    goToNextPage,
    goToPreviousPage,
    firstEmailId,
    lastEmailId,
  } = useEmailContext();

  return (
    <div className={styles.emailListContainer}>
      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          disabled={!hasPreviousPage}
          onClick={goToPreviousPage}
        >
          {"<"}
        </button>
        <span>
          {firstEmailId} - {lastEmailId} of {totalEmails}
        </span>
        <button
          className={styles.paginationButton}
          disabled={!hasNextPage}
          onClick={goToNextPage}
        >
          {">"}
        </button>
      </div>
      <ul className={styles.emailList}>
        {emails.map((email) => (
          <EmailListItem
            email={email}
            selectEmail={selectEmail}
            selected={selectedEmail?.id === email.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
