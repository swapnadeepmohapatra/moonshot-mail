import { API_URL } from "../utils/keys";

export const fetchEmails = async (page: number = 1) => {
  const response = await fetch(`${API_URL}?page=${page}`);
  return response.json();
};

export const fetchEmailBody = async (id: string) => {
  const response = await fetch(`${API_URL}?id=${id}`);
  return response.json();
};
