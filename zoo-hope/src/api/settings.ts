import { ISetting } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const getAllSettings = async () => {
    try {
        const response = await axios.get<ISetting[]>(`${requestURL}/get-all-settings`);
        return response.data;

    } catch (error) {
        console.error("Error fetching settings:", error);
        return [];
    }
};

export const addSetting = async (formData: any) => {
    try {
        const response = await axios.post<ISetting>(`${requestURL}/add-setting`, formData);
        return response.data; 
  
    } catch (error) {
        console.error('Error adding new setting:', error);
        return undefined;
    }
  };
  
  export const updateSetting = async (formData: any, id: string) => {
    try {
        const response = await axios.put<ISetting>(`${requestURL}/update-setting/${id}`, formData);
        return response.data; 
  
    } catch (error) {
        console.error('Error updating setting:', error);
        return undefined;
    }
  };

export const getOneSetting = async (id: string) => {
    try {
        const response = await axios.get<ISetting>(`${requestURL}/get-setting/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching setting data:', error);
        return undefined;
    }
};

export const deleteSetting = async (id: string) => {
    try {
        if (id) {
            const response = await axios.delete(`${requestURL}/delete-setting/${id}`);
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