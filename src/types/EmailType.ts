export interface Email {
  id: string;
  from: { name: string; email: string };
  subject: string;
  short_description: string;
  date: string;
  isRead: boolean;
  isFavorite: boolean;
}

export interface EmailBody {
  id: string;
  body: string;
}
