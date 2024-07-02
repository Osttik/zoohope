import { Link } from "react-router-dom";
import { ReactComponent as LinkIcon } from "../../../images/homePage/arrow-up-right-from-square-solid.svg";
import { useTranslation } from "react-i18next";
import { Translate } from "../../translation";

export const Question = ({ data, circleClass }: any) => {
    const { t, i18n } = useTranslation();
    return (
        <div className="info__info">
            <div className="info__info-content">
                <h1 className="info__title"><Translate obj={data.question} /></h1>
                <Link to={`/helpful-info/${data._id}`} className="info__link">{t('learn_more_link')} <LinkIcon className="info__link-icon" /></Link>
            </div>

            <div className={`info__circle ${circleClass}`}></div>
        </div>
    )
}