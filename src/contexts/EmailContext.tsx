import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchEmailBody, fetchEmails } from "../services/emailService";
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
  filter: string;
  changeFilter: (newFilter: FilterType) => void;
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
  filter: "",
  changeFilter: () => {},
});

export enum FilterType {
  Unread = "Unread",
  Read = "Read",
  Favorites = "Favorites",
  None = "",
}

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
  const [filter, setFilter] = useState<FilterType>(FilterType.None);

  useEffect(() => {
    const loadEmails = async () => {
      const storedEmails = JSON.parse(
        localStorage.getItem("persistedEmails") || "[]"
      );
      const emailData = await fetchEmails();

      const mergedEmails = emailData.list.map((email: Email) => {
        const storedEmail = storedEmails.find((e: Email) => e.id === email.id);
        return storedEmail ? { ...email, ...storedEmail } : email;
      });

      setEmails(mergedEmails);
    };
    loadEmails();
  }, []);

  const persistEmails = (updatedEmails: Email[]) => {
    const persistedEmails = updatedEmails.filter(
      (email) => email.isFavorite || email.isRead
    );
    localStorage.setItem("persistedEmails", JSON.stringify(persistedEmails));
  };

  const toggleFavorite = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
      )
    );
    persistEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
      )
    );

    if (selectedEmail?.id === id) {
      setSelectedEmail((prevEmail) =>
        prevEmail ? { ...prevEmail, isFavorite: !prevEmail.isFavorite } : null
      );
    }
  };

  const markAsRead = (id: string) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isRead: true } : email
      )
    );
    persistEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isRead: true } : email
      )
    );
  };

  const selectEmail = async (email: Email) => {
    if (selectedEmail?.id === email.id) {
      setSelectedEmail(null);
      return;
    }

    const emailBody = await fetchEmailBody(email.id);
    setSelectedEmail({ ...email, body: emailBody });
    markAsRead(email.id);
  };

  const getUnreadEmails = () => emails.filter((email) => !email.isRead);

  const getFavoriteEmails = () => emails.filter((email) => email.isFavorite);

  const getReadEmails = () => emails.filter((email) => email.isRead);

  const changeFilter = (newFilter: FilterType) => {
    if (filter === newFilter) {
      setFilter(FilterType.None);
      return;
    }
    setFilter(newFilter);
  };

  return (
    <EmailContext.Provider
      value={{
        emails:
          filter === FilterType.Unread
            ? getUnreadEmails()
            : filter === FilterType.Read
            ? getReadEmails()
            : filter === FilterType.Favorites
            ? getFavoriteEmails()
            : emails,
        selectedEmail,
        toggleFavorite,
        markAsRead,
        selectEmail,
        getUnreadEmails,
        getFavoriteEmails,
        getReadEmails,
        filter,
        changeFilter,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
