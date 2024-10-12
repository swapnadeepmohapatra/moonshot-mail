import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchEmails } from "./services/emailService";
import { Email } from "./types/EmailType";

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const getEmails = async () => {
      const emailData = await fetchEmails();
      setEmails(emailData.list);
    };
    getEmails();
  }, []);

  return <div className="app">{JSON.stringify(emails)}</div>;
};

export default App;
