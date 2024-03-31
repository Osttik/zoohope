import { requestURL } from "./api";
import axios from "axios";

export const apiGetAllHelpOptions = async () => {
  const res = await axios(`${requestURL}/get-all-help-options`);
  return res.data
}