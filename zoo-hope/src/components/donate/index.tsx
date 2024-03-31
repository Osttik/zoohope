import { useState, ChangeEvent } from "react";
import "./../../styles/index.scss";
import Paw from "../../images/icons/paw_icon.png";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const Donate = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const { t } = useTranslation();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(event.target.value));
  };
  
  const handleButtonClick = (amount: number) => {
    setInputValue(inputValue + amount);
  };

  return (
    <div className="wrapper_donate">
      <span>{t("donate_helpus")}</span>
      <div className="wrapper_donate__input">
        <input
          type="number"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="wrapper_buttons">
        <button onClick={() => handleButtonClick(10)}>+10</button>
        <button onClick={() => handleButtonClick(100)}>+100</button>
        <button onClick={() => handleButtonClick(1000)}>+1000</button>
      </div>
      <div className="wrapper_buttons__pay">
        <a href="https://send.monobank.ua/jar/BhQbi8BR8?fbclid=IwAR04yzp55zkm1xeE9D0UD5mYfiPAc7X8mBvWJk2VpCYU1N_uRkOgomVj04E">
          {t("donate_pay")}
          <img src={Paw} alt="paw_img" />
        </a>
      </div>
    </div>
  );
};

export default Donate;