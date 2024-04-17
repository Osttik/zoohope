import "../../styles/login-page/loginPage.scss";
export const LoginPage = () => {
  return (
    <form className="login_form">
      <h1>Авторизація</h1>
      <input className="login_form__input" type="text" />
      <input className="login_form__input" type="password" />
      <input
        className="login_form__button"
        type="submit"
        name="submit"
        value="Увійти"
      />
    </form>
  );
};
