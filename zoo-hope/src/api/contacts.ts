import { requestURL } from "./api";

export const apiGetContacts = async () => {
  const res = await fetch(`${requestURL}/get-all-contacts`);
  const json = await res.json();
  return (json);
}