import { IHelpfulInfo } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const getAllHelpfulInfo = async () => {
    try {
        const response = await axios.get<IHelpfulInfo[]>(`${requestURL}/get-all-helpful-info`);

        return response.data;
    } catch (error) {
        console.error("Error fetching helpful info:", error);

        return [];
    }
};

export const addHelpfulInfo = async (formData: any) => {
    try {
        const response = await axios.post<IHelpfulInfo>(`${requestURL}/add-helpful-info`, formData);

        return response.data; 
    } catch (error) {
        console.error('Error adding helpful info:', error);

        return undefined;
    }
}

export const editHelpfulInfo = async (formData: any, id: string) => {
    try {
        const response = await axios.put<IHelpfulInfo>(`${requestURL}/update-helpful-info/${id}`, formData);

        return response.data; 
    } catch (error) {
        console.error('Error editing helpful info:', error);

        return undefined;
    }
};

export const getOneHelpfulInfo = async (id: string) => {
    try {
        const response = await axios.get<IHelpfulInfo>(`${requestURL}/get-helpful-info/${id}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching helpful info data:', error);

        return undefined;
    }
};

export const deleteHelpfulInfo = async (id: string) => {
    try {
        if (id) {
            const response = await axios.delete<IHelpfulInfo>(`${requestURL}/delete-helpful-info/${id}`);

            return response.data;
        } else {
            console.error('Не розуміє id елемента');
        }
    } catch (error) {
        console.error('Помилка при видаленні елемента', error);
    }
};