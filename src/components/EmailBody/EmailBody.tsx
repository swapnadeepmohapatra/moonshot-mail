import React from "react";
import { useEmailContext } from "../../contexts/EmailContext";

const EmailBody: React.FC = () => {
  const { selectedEmail } = useEmailContext();

  if (!selectedEmail) {
    return (
      <article>
        <h2>No email selected</h2>
      </article>
    );
  }

  return (
    <article>
      <h2>{selectedEmail?.from?.name?.charAt(0)}</h2>
      <h2>{selectedEmail?.subject}</h2>
      <p>{new Date(selectedEmail?.date).toLocaleString()}</p>
      <p
        dangerouslySetInnerHTML={{
          __html: selectedEmail?.body?.body || "",
        }}
      ></p>
    </article>
  );
};

export default EmailBody;
