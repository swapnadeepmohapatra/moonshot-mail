import React from "react";
import { useEmailContext } from "../../contexts/EmailContext";
import EmailListItem from "../EmailListItem/EmailListItem";
import styles from "./styles.module.css";

const EmailList: React.FC = () => {
  const { emails, selectEmail, selectedEmail } = useEmailContext();

  return (
    <ul className={styles.emailList}>
      {emails.map((email) => (
        <EmailListItem
          email={email}
          selectEmail={selectEmail}
          selected={selectedEmail?.id === email.id}
        />
      ))}
    </ul>
  );
};

export default EmailList;
