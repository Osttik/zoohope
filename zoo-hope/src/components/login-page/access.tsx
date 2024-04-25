import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Loader from "../PetPage/loader";
import PetContext from "../../PetsContext";

async function refreshToken(refreshToken: string) {
  try {
    const response = await axios.post('http://localhost:5000/refresh', { refresh_token: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return false


  }
}
async function verifyAc(token: string) {
  try {
    const response = await axios.post('http://localhost:5000/verify', { token: token })
    return response.data;


  }
  catch (error: any) {
    console.error('Помилка', error.message);
    if (error.response && error.response.status === 403) {
      console.error('Поганий токен');

      return false;
    }
  }
}



function getCookieValue(key: string) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${key}=`)) {
      return cookie.substring(key.length + 1);
    }
  }
  return null;
}

export const AccessFunc = ({ children, role }: { children: JSX.Element, role: 'user' | 'admin' }) => {
  const navigate = useNavigate();
  const logErMes = useContext(PetContext)[3];
  const setlogErMes = useContext(PetContext)[4];
  const Path = useContext(PetContext)[1];
  const setPath = useContext(PetContext)[2];
  const [loading, setLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = getCookieValue('accessToken');

      if (!accessToken || !(await verifyAc(accessToken))) {

        const refreshTokenValue = getCookieValue('refreshToken');
        if (refreshTokenValue && (await refreshToken(refreshTokenValue))) {
          try {
            const tokens = await refreshToken(refreshTokenValue);
            document.cookie = `accessToken=${tokens.access_token}; max-age=${1 * 60 * 60}; path=/; SameSite=None; Secure`;
            document.cookie = `refreshToken=${tokens.refresh_token}; max-age=${7 * 24 * 60 * 60}; path=/; SameSite=None; Secure`;
            checkTokens()
          } catch (error) {
            console.error('Error refreshing tokens:', error);

          }
        } else {
          setlogErMes('login');
          setPath('/admin');
          navigate('/login');
        }
      } else {
        const userData = await verifyAc(accessToken).then((a) => { return a });
        if (userData.role == role || userData.role == 'admin') {
          setLoading(false);
        } else { setlogErMes('role'); setPath('/admin'); navigate('/login') }
      }
    };

    checkTokens();
  }, []);


  return loading ? <Loader /> : children;
}