import { requestURL } from "./api";

export const apiGetAllHelpOptions = async () => {
  const res = await fetch(`${requestURL}/get-all-help-options`);
  const json = await res.json();
  return (json);
}