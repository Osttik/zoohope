import { requestURL } from "./api";

export const apiGetAllPets = async () => {
    const res = await fetch(`${requestURL}/get-all-pets`);
    const json = await res.json();
    return (json);
}