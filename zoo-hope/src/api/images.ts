import { requestURL } from "./api";
import axios from "./axios";

export const uploadImage = async (imgData: FormData) => {
    try {
        const responce = await axios.post<string>(`${requestURL}/upload-contact-image`, imgData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return responce.data;
    } catch (error) {
        return undefined;
    }
};

export const uploadImages = async (imgsData: FormData) => {
    try {
        const responce = await axios.post<string[]>(`${requestURL}/upload-pet-images`, imgsData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return responce.data;
    } catch (error) {
        return undefined;
    }
};