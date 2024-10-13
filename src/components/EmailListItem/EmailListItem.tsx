import React from "react";
import { Email } from "../../types/EmailType";
import styles from "./styles.module.css";
import { formatDate } from "../../utils/formatDate";

interface EmailListItemProps {
  email: Email;
  selectEmail: (email: Email) => void;
  selected: boolean;
}

function EmailListItem({ email, selectEmail, selected }: EmailListItemProps) {
  return (
    <li
      key={email.id}
      aria-label={`Email from ${email.from.name}`}
      onClick={() => selectEmail(email)}
      className={`${styles.emailListItem} ${
        email.isRead ? styles.emailRead : styles.emailUnread
      } ${selected ? styles.emailSelected : ""}`}
    >
      <div className={styles.avatar}>
        <h2>{email.from.name.charAt(0).toUpperCase()}</h2>
      </div>
      <div>
        <p>
          From:
          <span className={styles.emailHighlight}>
            {email.from.name} {"<"}
            {email.from.email}
            {">"}
          </span>
        </p>
        <p>
          Subject:
          <span className={styles.emailHighlight}>{email.subject}</span>
        </p>
        <p>{email.short_description}</p>
        <p>
          {formatDate(email.date)}
          <span className={styles.emailFavorite}>
            {!email.isFavorite ? "Favorite" : ""}
          </span>
        </p>
      </div>
    </li>
  );
}

export default EmailListItem;
