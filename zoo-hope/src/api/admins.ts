import Cookies from "js-cookie";
import { requestURL } from "./api";
import axios from "./axios";

export const getAllAdmins = async () => {
    try {
        const response = await axios.get<any[]>(`${requestURL}/get-all-admins`);
        return response.data;

    } catch (error) {
        console.error("Error fetching admins:", error);
        return [];
    }
};

export const addAdmin = async (formData: any) => {
    try {
        const response = await axios.post(`${requestURL}/register`, formData);
        return response.data;

    } catch (error) {
        console.error('Error adding admin:', error);
    }
}

export const editAdmin = async (formData: any, id: string) => {
    try {
        const response = await axios.put(`${requestURL}/update-admin/${id}`, formData);
        const { updatedAdmin, tokens } = response.data;
        
        Cookies.set('accessToken', tokens.access_token);
        Cookies.set('refreshToken', tokens.refresh_token);

        return updatedAdmin;

    } catch (error) {
        console.error('Error editing admin:', error);
    }
};

export const getOneAdmin = async (id: string) => {
    try {
        const response = await axios.get(`${requestURL}/get-admin/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching admin data:', error);
    }
};

export const deleteAdmin = async (id: string) => {
    try {
        if (id) {
            const response = await axios.delete(`${requestURL}/delete-admin/${id}`);
            return response.data;

        } else {
            console.error('Не розуміє id елемента');
        }
    } catch (error) {
        console.error('Помилка при видаленні елемента', error);
    }
};