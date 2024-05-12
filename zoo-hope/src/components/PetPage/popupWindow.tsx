import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../../i18n/i18n";
import { apiSendMail } from "../../api/mail";
import { useRef } from "react";

interface PopupWindowProps {
    active: boolean;
    setActive: (active: boolean) => void;
  }
  
  export default function PopupWindow({ active, setActive }: PopupWindowProps) {
    const firstNameRef = useRef<any>(null)
    const lastNameRef = useRef<any>(null);
    const emailRef = useRef<any>(null);
    const commentRef = useRef<any>(null);
    const phoneRef = useRef<any>(null)
    const { t } = useTranslation();

    function setCookie(cname:string, cvalue:string, exdays:number) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const handleClick = async () => {
        await apiSendMail(
          emailRef.current?.value,
          commentRef.current?.value,
          firstNameRef.current?.value,
          lastNameRef.current?.value,
          phoneRef.current?.value
        );
    }
    

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
                            <input ref={firstNameRef} className="popupMainBlock__info__inputBlock__input" placeholder={t('person_name')} required></input>
                            <input ref={phoneRef} className="popupMainBlock__info__inputBlock__input" placeholder={t('person_phone_number')} required></input>
                            <input ref={lastNameRef} className="popupMainBlock__info__inputBlock__input" placeholder={t('person_last_name')} required></input>
                            <input ref={emailRef} className="popupMainBlock__info__inputBlock__input" placeholder={t('person_email')} required></input>
                            <textarea ref={commentRef} className="popupMainBlock__info__inputBlock__inputComent" placeholder={t('person_comment')}></textarea>
                        </div>
                        <button type="submit" onClick={handleClick} className="popupMainBlock__info__form__submitButton">
                            <p>{t('adopt_pet')}</p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}