import "./../../styles/index.scss";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
const Donate = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="wrapper_donate">
      <span>{t('donate_helpus')}</span>
      <div className="wrapper_donate__input">
        <input type="number" inputMode="numeric"></input>
      </div>
      <div className="wrapper_buttons">
        <button>+10</button>
        <button>+100</button>
        <button>+1000</button>
      </div>
      <div className="wrapper_buttons__pay">
        <button>{t('donate_pay')}</button>
      </div>
    </div>
  );
};
export default Donate;
