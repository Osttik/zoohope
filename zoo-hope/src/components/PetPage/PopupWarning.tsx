import { faPaw, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface IPopupProps {
    warningActive: boolean;
    setWarningActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopupWarning = ({ warningActive, setWarningActive }: IPopupProps) => {
    const { t } = useTranslation();
    return (
        <div className="popup-warning" style={{ display: warningActive ? 'block' : 'none' }}>
            <div className="popup-warning__container">
                <div className="popup-warning__head">
                    <button onClick={() => { setWarningActive(false) }}><FontAwesomeIcon icon={faXmark} /></button>
                </div>

                <div className="popup-warning__content">
                    <h1>{t('message_title_warning')}</h1>

                    <p>
                        {t('message_first_rule')} <span>{t('message_second_rule')} </span>
                        <br /> {t('message_example_title')}
                        <br /><br />{t('message_example')}
                        <br /> <br /><span>{t('message_third_rule')}</span>
                    </p>

                    <a href="https://send.monobank.ua/jar/BhQbi8BR8?fbclid=IwAR04yzp55zkm1xeE9D0UD5mYfiPAc7X8mBvWJk2VpCYU1N_uRkOgomVj04E">
                        <FontAwesomeIcon icon={faPaw} /> {t('message_pay_btn')}
                    </a>
                </div>
            </div>
        </div>
    )
}