import { IContact } from "../define";
import { requestURL } from "./api";
import axios from "axios";

export const apiGetContacts = async () => {
  const res = await axios.get<IContact[]>(`${requestURL}/get-all-contacts`);
  return res.data;
}