import { IHelpOption } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const apiGetAllHelpOptions = async () => {
  try {
      const response = await axios.get<IHelpOption[]>(`${requestURL}/get-all-help-options`);
      return response.data;

  } catch (error) {
      console.error("Error fetching help options:", error);
      return [];
  }
};

export const addHelpOption = async (formData: any) => {
  try {
      const response = await axios.post(`${requestURL}/add-help-option`, formData);
      return response.data; 

  } catch (error) {
      console.error('Error adding help option:', error);
  }
}

export const editHelpOption = async (formData: any, id: string) => {
  try {
      const response = await axios.put(`${requestURL}/update-help-option/${id}`, formData);
      return response.data; 

  } catch (error) {
      console.error('Error editing help option:', error);
  }
};

export const getOneHelpOption = async (id: string) => {
  try {
      const response = await axios.get(`${requestURL}/get-help-option/${id}`);
      return response.data;

  } catch (error) {
      console.error('Error fetching help option data:', error);
  }
};

export const deleteHelpOption = async (id: string) => {
  try {
      if (id) {
          const response = await axios.delete(`${requestURL}/delete-help-option/${id}`);
          return response.data;
      } else {
          console.error('Не розуміє id елемента');
      }
  } catch (error) {
      console.error('Помилка при видаленні елемента', error);
  }
};