import { IPet } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const apiGetAllPets = async () => {
  const res = await axios.get<IPet[]>(`${requestURL}/get-all-pets`);
  return res.data;
};