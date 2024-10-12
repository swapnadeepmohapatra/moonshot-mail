import React from "react";
import { useEmailContext } from "../../contexts/EmailContext";

const EmailList: React.FC = () => {
  const { emails, selectEmail } = useEmailContext();

  return (
    <ul>
      {emails.map((email) => (
        <li
          key={email.id}
          aria-label={`Email from ${email.from.name}`}
          onClick={() => selectEmail(email)}
        >
          <div>
            <h2>{email.from.name.charAt(0)}</h2>
          </div>
          <div>
            <h3>{email.subject}</h3>
            <p>{email.short_description}</p>
            <p>{new Date(email.date).toLocaleString()}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EmailList;
