import { useTranslation } from "react-i18next";
import PopupWindow from "./popupWindow";
import { PopupWarning } from "./PopupWarning";
import "../../i18n/i18n";
import { useState } from "react";


export function HelpPetBlock() {
  const { t } = useTranslation();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [warningActive, setWarningActive] = useState<boolean>(false);

  return (
    <div className="helpPetBlock">
      <div className="helpPetBlock__text">
        <h2>{t('how_to_help+')}</h2>
        <p>{t('petPage_additional_help')}</p>
      </div>
      <div className="helpPetBlock__info">
        <button onClick={() => { setWarningActive(true);}}  className="helpPetBlock__info__topLeft helpPetBlock__info__button">
          <p>{t('pay_for_sterilization')}</p>
        </button>

        <button onClick={() => { setWarningActive(true);}} className="helpPetBlock__info__topRight helpPetBlock__info__button">
          <p>{t('pay_for_therapy')}</p>
        </button>

        <button onClick={() => { setWarningActive(true) }} className="helpPetBlock__info__downRight helpPetBlock__info__button">
          <p>{t('buy_toy')}</p>
        </button>

        <button className="helpPetBlock__info__downLeft helpPetBlock__info__button" onClick={() => { setModalActive(true) }}>
          <p>{t('temporary_detention')}</p>
        </button>

        <div className="helpPetBlock__info__logo"></div>
      </div>

      <PopupWindow active={modalActive} setActive={setModalActive} />
      <PopupWarning warningActive={warningActive} setWarningActive={setWarningActive} />
    </div>
  );
}