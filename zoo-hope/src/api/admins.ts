import Cookies from "js-cookie";
import { requestURL } from "./api";
import axios from "./axios";
import { IAdmin, ITokens } from "../define";

export const getAllAdmins = async () => {
    try {
        const response = await axios.get<IAdmin[]>(`${requestURL}/get-all-admins`);
        return response.data;

    } catch (error) {
        console.error("Error fetching admins:", error);
        return [];
    }
};

export const addAdmin = async (formData: any) => {
    try {
        const response = await axios.post<IAdmin>(`${requestURL}/register`, formData);
        return response.data;

    } catch (error) {
        console.error('Error adding admin:', error);
    }
}

export const editAdmin = async (formData: any, id: string) => {
    try {
        const response = await axios.put<{ updatedAdmin: IAdmin, tokens: ITokens }>(`${requestURL}/update-admin/${id}`, formData);
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
        const response = await axios.get<IAdmin>(`${requestURL}/get-admin/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching admin data:', error);
    }
};

export const deleteAdmin = async (id: string) => {
    try {
        if (id) {
            const response = await axios.delete<IAdmin>(`${requestURL}/delete-admin/${id}`);
            return response.data;

        } else {
            console.error('Не розуміє id елемента');
        }
    } catch (error) {
        console.error('Помилка при видаленні елемента', error);
    }
};

export const login = async (data: { email: string, password: string}) => {
    try {
        var responce = await axios.post<ITokens>(`${requestURL}/login`, data);

        return responce.data;
    } catch (error) {
        console.error('Помилка', error);
    }
}

export const refresh = async (data: string) => {
    try {
        var responce = await axios.post<ITokens>(`${requestURL}/refresh`, { refresh_token: data });

        return responce.data;
    } catch (error) {
        console.error('Помилка', error);
    }
}

export const verify = async (data: string) => {
    try {
        var responce = await axios.post<IAdmin>(`${requestURL}/verify`, { token: data });

        return responce.data;
    } catch (error) {
        console.error('Помилка', error);
    }
}