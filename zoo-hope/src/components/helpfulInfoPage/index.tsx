import "../../styles/index.scss";
import { ReactComponent as DogIcon } from "../../images/homePage/pomeranian-svgrepo-com.svg";
import { Question } from "./question";
import { useEffect, useState } from "react";
import { getAllHelpfulInfo } from "../../api/helpfulInfo";
import { IHelpfulInfo } from "../../define";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

export const HelpfulInfoPage = () => {
    const { t, i18n } = useTranslation();
    const [questions, setQuestions] = useState<IHelpfulInfo[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getAllHelpfulInfo().then(setQuestions) 
        console.log(id);
        
    }, [])
    return (
        <div className="helpful-info">
            <div className="helpful-info__container">
                <div className="about-the-page">
                    <div className="about-the-page__container">
                        <h1>{t('helpful_info')}</h1>

                        <p>{t('helpful_info_page_description')}</p>

                        <div className="about-the-page__circle">
                            <DogIcon className="about-the-page__circle-icon dog" />
                        </div>
                    </div>
                </div>

                <div className="questions">
                    <div className="questions__container">
                        {questions.map((question: IHelpfulInfo, index: number) => (
                            <Question
                                key={index}
                                data={question}
                                id={question._id === id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}