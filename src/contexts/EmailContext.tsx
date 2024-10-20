import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
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
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalEmails: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  firstEmailId: string;
  lastEmailId: string;
  loading: boolean;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEmails, setTotalEmails] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadEmails = async () => {
      setLoading(true);
      const storedEmails = JSON.parse(
        localStorage.getItem("persistedEmails") || "[]"
      );
      const emailData = await fetchEmails(currentPage);

      setTotalEmails(emailData.total);

      const mergedEmails = emailData.list.map((email: Email) => {
        const storedEmail = storedEmails.find((e: Email) => e.id === email.id);
        return storedEmail ? { ...email, ...storedEmail } : email;
      });

      setEmails(mergedEmails);
      setLoading(false);
    };
    loadEmails();
  }, [currentPage]);

  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const goToPreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const persistEmails = (updatedEmails: Email[]) => {
    const persistedEmails = updatedEmails.filter(
      (email) => email.isFavorite || email.isRead
    );
    localStorage.setItem("persistedEmails", JSON.stringify(persistedEmails));
  };

  const updateEmail = (id: string, changes: Partial<Email>) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, ...changes } : email
    );
    setEmails(updatedEmails);
    persistEmails(updatedEmails);
  };

  const toggleFavorite = (id: string) => {
    const email = emails.find((e) => e.id === id);
    if (email) updateEmail(id, { isFavorite: !email.isFavorite });
  };

  const markAsRead = (id: string) => {
    updateEmail(id, { isRead: true });
  };

  const selectEmail = async (email: Email) => {
    if (selectedEmail?.id === email.id) {
      setSelectedEmail(null);
      return;
    }

    setLoading(true);

    const emailBody = await fetchEmailBody(email.id);
    setSelectedEmail({ ...email, body: emailBody });
    markAsRead(email.id);

    setLoading(false);
  };

  const filteredEmails = useMemo(() => {
    switch (filter) {
      case FilterType.Unread:
        return emails.filter((email) => !email.isRead);
      case FilterType.Read:
        return emails.filter((email) => email.isRead);
      case FilterType.Favorites:
        return emails.filter((email) => email.isFavorite);
      default:
        return emails;
    }
  }, [emails, filter]);

  const changeFilter = (newFilter: FilterType) => {
    setFilter((prevFilter) =>
      prevFilter === newFilter ? FilterType.None : newFilter
    );
  };

  return (
    <EmailContext.Provider
      value={{
        emails: filteredEmails,
        selectedEmail,
        toggleFavorite,
        markAsRead,
        selectEmail,
        getUnreadEmails: () => emails.filter((email) => !email.isRead),
        getFavoriteEmails: () => emails.filter((email) => email.isFavorite),
        getReadEmails: () => emails.filter((email) => email.isRead),
        filter,
        changeFilter,
        currentPage,
        goToNextPage,
        goToPreviousPage,
        hasNextPage: totalEmails > parseInt(emails[emails.length - 1]?.id),
        hasPreviousPage: currentPage > 1,
        totalEmails,
        firstEmailId: emails[0]?.id,
        lastEmailId: emails[emails.length - 1]?.id,
        loading,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
