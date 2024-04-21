import { IHelpOption } from "../define";
import { requestURL } from "./api";
import axios from "./axios";

export const apiGetAllHelpOptions = async () => {
  const res = await axios.get<IHelpOption[]>(`${requestURL}/get-all-help-options`);
  return res.data
}