import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchEmails } from "../services/emailService";
import { Email } from "../types/EmailType";

interface EmailContextType {
  emails: Email[];
  selectedEmail: Email | null;
  toggleFavorite: (id: string) => void;
  markAsRead: (id: string) => void;
  selectEmail: (email: Email) => void;
  getUnreadEmails: () => Email[];
  getFavoriteEmails: () => Email[];
  getReadEmails: () => Email[];
}

const EmailContext = createContext<EmailContextType>({
  emails: [],
  selectedEmail: null,
  toggleFavorite: () => {},
  markAsRead: () => {},
  selectEmail: () => {},
  getUnreadEmails: () => [],
  getFavoriteEmails: () => [],
  getReadEmails: () => [],
});

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmailContext must be used within an EmailProvider");
  }
  return context;
};

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    const loadEmails = async () => {
      const emailData = await fetchEmails();
      setEmails(emailData.list);
    };
    loadEmails();
  }, []);

  const toggleFavorite = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
      )
    );
  };

  const markAsRead = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isRead: true } : email
      )
    );
  };

  const selectEmail = (email: Email) => {
    markAsRead(email.id);
    setSelectedEmail(email);
  };

  const getUnreadEmails = () => emails.filter((email) => !email.isRead);

  const getFavoriteEmails = () => emails.filter((email) => email.isFavorite);

  const getReadEmails = () => emails.filter((email) => email.isRead);

  return (
    <EmailContext.Provider
      value={{
        emails,
        selectedEmail,
        toggleFavorite,
        markAsRead,
        selectEmail,
        getUnreadEmails,
        getFavoriteEmails,
        getReadEmails,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
