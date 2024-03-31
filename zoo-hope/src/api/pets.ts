import { requestURL } from "./api";
import axios from "axios";

export const apiGetAllPets = async () => {
  const res = await axios(`${requestURL}/get-all-pets`);
  return res.data;
};