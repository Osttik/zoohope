import { IContact } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const getAllContacts = async () => {
  try {
      const response = await axios.get<IContact[]>(`${requestURL}/get-all-contacts`);
      return response.data;

  } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
  }
};

export const addContact = async (formData: any) => {
  try {
      const response = await axios.post<IContact>(`${requestURL}/add-contact`, formData);
      return response.data; 

  } catch (error) {
      console.error('Error adding contact:', error);
      return undefined;
  }
};

export const updateContact = async (formData: any, id: string) => {
  try {
      const response = await axios.put<IContact>(`${requestURL}/update-contact/${id}`, formData);
      return response.data; 

  } catch (error) {
      console.error('Error updating contact:', error);
      return undefined;
  }
};

export const getOneContact = async (id: string) => {
  try {
      const response = await axios.get<IContact>(`${requestURL}/get-contact/${id}`);
      return response.data;

  } catch (error) {
      console.error('Error fetching contacts data:', error);
      return undefined;
  }
};

 export const deleteContact = async (id: string) => {
  try {
      if (id) {
          const response = await axios.delete(`${requestURL}/delete-contact/${id}`);
          return response.data;
      } else {
          console.error('Не розуміє id елемента');
          return undefined;
      }
  } catch (error) {
      console.error('Помилка при видаленні елемента', error);
      return undefined;
  }
};