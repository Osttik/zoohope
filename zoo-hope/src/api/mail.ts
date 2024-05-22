import { requestURL } from "./api";
import axios from "./axios";

export const apiSendMail = async (email:string, msg:string, firstName:string, lastName:string, phone:string) => {
  const res = await axios.post(`${requestURL}/send-mail`, {
    email,
    msg,
    firstName,
    lastName,
    phone
  });
  return res.data;
};
