import { IPet } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const getAllPets = async () => {
    try {
        const response = await axios.get(`${requestURL}/get-all-pets`);
        const data = response.data.filter((pet: IPet) => pet.adopted === 'Ні');
        return data;

    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

export const getCats = async () => {
    try {
        const response = await axios.get(`${requestURL}/get-all-pets`);
        const data = response.data.filter((pet: IPet) => pet.type === 'Кіт');
        return data;

    } catch (error) {
        console.error("Error fetching cats:", error);
        return [];
    }
};

export const getDogs = async () => {
    try {
        const response = await axios.get(`${requestURL}/get-all-pets`);
        const data = response.data.filter((pet: IPet) => pet.type === 'Пес');
        return data;

    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

export const getNeedTreatmentPet = async () => {
    try {
        const response = await axios.get(`${requestURL}/get-all-pets`);
        const data = response.data.filter((pet: IPet) => pet.treatment === 'Потребує');
        return data;

    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

export const getAdoptedPets = async () => {
    try {
        const response = await axios.get(`${requestURL}/get-all-pets`);
        const data = response.data.filter((pet: IPet) => pet.adopted === 'Так');
        return data;

    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

export const getTimeAdoptedPets = async () => {
    try {
        const response = await axios.get(`${requestURL}/get-all-pets`);
        const data = response.data.filter((pet: IPet) => pet.timeAdopted === 'Так');
        return data;

    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

export const addPet = async (formData: any) => {
    try {
        const response = await axios.post(`${requestURL}/add-pet`, formData);
        return response.data;
    } catch (error) {
        console.error('Error adding pet:', error);
    }
};

export const updatePet = async (formData: any, id: string) => {
    try {
        const response = await axios.put(`${requestURL}/update-pet/${id}`, formData);
        return response.data;

    } catch (error) {
        console.error('Error adding pet:', error);
    }
};

export const getOnePet = async (id: string) => {
    try {
        const response = await axios.get(`${requestURL}/get-pet/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching pet data:', error);
    }
};

export const deletePet = async (id: string) => {
    try {
        if (id) {
            const response = await axios.delete(`${requestURL}/delete-pet/${id}`);
            return response.data;
        } else {
            console.error('Не розуміє id елемента');
        }
    } catch (error) {
        console.error('Помилка при видаленні елемента', error);
    }
};