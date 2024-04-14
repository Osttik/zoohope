import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

export function HelpPet() {
  const { t } = useTranslation();

  return (
    <div className="helpPetBlock">
        <div className="helpPetBlock__text">
          <h2>{t('how_to_help+')}</h2>
          <p>{t('petPage_additional_help')}</p>
        </div>
        <div className="helpPetBlock__info">
          <button className="helpPetBlock__info__topLeft helpPetBlock__info__button">
            <p>{t('pay_for_sterilization')}</p>
          </button>
          <button className="helpPetBlock__info__topRight helpPetBlock__info__button">
            <p>{t('pay_for_therapy')}</p>
          </button>
          <button className="helpPetBlock__info__downRight helpPetBlock__info__button">
            <p>{t('buy_toy')}</p>
          </button>
          <button className="helpPetBlock__info__downLeft helpPetBlock__info__button">
            <p>{t('temporary_detention')}</p>
          </button>
          <div className="helpPetBlock__info__logo">

          </div>
        </div>
    </div>
  );
}