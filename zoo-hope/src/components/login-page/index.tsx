import "../../styles/login-page/loginPage.scss";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import PetContext from "../../PetsContext";
import { useNavigate } from "react-router";
import { ErrorRoleMes } from "./errorRole";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { login } from "../../api/admins";


export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logErMes, setlogErMes } = useContext(PetContext);

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

  async function loginUser(data: any) {
    try {
      const response = await login(data);
      if (response) {
        const accessTokenExpires = new Date();
        accessTokenExpires.setTime(accessTokenExpires.getTime() + (1 * 60 * 60 * 1000));
        const refreshTokenExpires = new Date();
        refreshTokenExpires.setTime(refreshTokenExpires.getTime() + (7 * 24 * 60 * 60 * 1000));

        document.cookie = `accessToken=${response.access_token}; expires=${accessTokenExpires.toUTCString()}; path=/; SameSite=None; Secure`;
        document.cookie = `refreshToken=${response.refresh_token}; expires=${refreshTokenExpires.toUTCString()}; path=/; SameSite=None; Secure`;
        navigate('/admin');
      } else { setlogErMes('passormail'); }

    } catch (error: any) {
      console.error(error.response.data);
      setlogErMes('passormail');

    }
  }

  return (
    <form className="login_form">
      {logErMes === 'role' && <ErrorRoleMes text={`${t('noRights')} ˙◠˙`} />}
      {logErMes === 'passormail' && <ErrorRoleMes text={`${t('invalidPassOrMail')} ✘`} />}
      <h1 className="form_h1">{t('auth')}</h1>
      <div>
        <input {...register('email', { required: { value: true, message: t('required') }, minLength: { value: 7, message: `${t('min7sym')} ❌` }, pattern: { value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, message: `${t('badMail')} ☹︎` } })} id="E-mail" placeholder={"E-mail"} className="login_form__input" type="text" />
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'left', fontSize: '23px' }}>{errors.email && String(errors.email.message)}</div>
      </div>
      <div>
        <input {...register('password', { required: { value: true, message: t('required') }, minLength: { value: 4, message: `${t('min4sym')} ❌` } })} id="Password" placeholder="Password" className="login_form__input" type="password" />
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'left', fontSize: '23px' }}>{errors.password && String(errors.password.message)}</div>
      </div>
      <input
        className="login_form__button"
        type="submit"
        name="submit"
        value={t('logIn')}
        onClick={handleSubmit(loginUser)}
      />
    </form>
  );
};
