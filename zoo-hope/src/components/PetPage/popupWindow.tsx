import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../i18n/i18n";


interface PopupWindowProps {
    active: boolean;
    setActive: (active: boolean) => void;
  }
  
  export default function PopupWindow({ active, setActive }: PopupWindowProps) {

    const { t } = useTranslation();

    return(
        <div className={active? "popupWindow active" : "popupWindow"}>
            <div className="popupMainBlock">
                <div className="popupMainBlock__head">
                    <div className="popupMainBlock__head__contactUs">
                        <Link to={"/"} className="popupMainBlock__head__contactUs__link">{t('contact_us')}</Link>
                    </div>
                    <div className="popupMainBlock__head__closeButtonHover" onClick={() => {setActive(false)}}>
                        <div className="popupMainBlock__head__closeButton"></div>
                    </div>
                </div>
                <div className="popupMainBlock__info">
                    <h2>{t('popupWindow_h2_title')}</h2>
                    <form className="popupMainBlock__info__form">
                        <div className="popupMainBlock__info__inputBlock">
                            <input className="popupMainBlock__info__inputBlock__input" placeholder={t('person_name')} required></input>
                            <input className="popupMainBlock__info__inputBlock__input" placeholder={t('person_phone_number')} required></input>
                            <input className="popupMainBlock__info__inputBlock__input" placeholder={t('person_last_name')} required></input>
                            <input className="popupMainBlock__info__inputBlock__input" placeholder={t('person_email')} required></input>
                            <textarea className="popupMainBlock__info__inputBlock__inputComent" placeholder={t('person_comment')}></textarea>
                        </div>
                        <button type="submit" className="popupMainBlock__info__form__submitButton">
                            <p>{t('adopt_pet')}</p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}