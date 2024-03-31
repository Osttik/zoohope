import { requestURL } from "./api";
import axios from "axios";

export const apiGetContacts = async () => {
  const res = await axios(`${requestURL}/get-all-contacts`)
  return res.data
}