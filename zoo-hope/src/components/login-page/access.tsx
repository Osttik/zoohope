import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "../PetPage/loader";
import PetContext from "../../PetsContext";
import { refresh, verify } from "../../api/admins";

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

export const AccessFunc = ({ children, role }: { children: JSX.Element, role: 'super-admin' | 'admin' }) => {
  const navigate = useNavigate();
  const { setlogErMes } = useContext(PetContext);
  const { setPrevPath } = useContext(PetContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = getCookieValue('accessToken');

      if (!accessToken || !(await verify(accessToken))) {

        const refreshTokenValue = getCookieValue('refreshToken');
        if (refreshTokenValue && (await refresh(refreshTokenValue))) {
          try {
            const tokens = await refresh(refreshTokenValue);
            if (!tokens) return;
            document.cookie = `accessToken=${tokens.access_token}; max-age=${1 * 60 * 60}; path=/; SameSite=None; Secure`;
            document.cookie = `refreshToken=${tokens.refresh_token}; max-age=${7 * 24 * 60 * 60}; path=/; SameSite=None; Secure`;
            checkTokens()
          } catch (error) {
            console.error('Error refreshing tokens:', error);

          }
        } else {
          setPrevPath('/admin');
          navigate('/login');
        }
      } else {
        const userData = await verify(accessToken);
        if (userData && (userData.role === role || userData.role === 'admin' || userData.role === 'super-admin')) {
          setLoading(false);
        } else { 
          setlogErMes('role'); 
          setPrevPath('/admin'); 
          navigate('/login') 
        }
      }
    };

    checkTokens();
  }, []);


  return loading ? <Loader /> : children;
}
