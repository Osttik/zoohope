import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Translate } from "../../translation";
import { TranslateQuestions } from "../../translation/questionTranslate";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";

export const Question = ({ data, id }: any) => {
    const [questionIsOpen, setQuestionIsOpen] = useState<boolean>(id);

    const toggleQuestion = () => {
        setQuestionIsOpen(!questionIsOpen);
    };

    const formatText = (obj: { [key: string]: string }) => {
        const formattedText: { [key: string]: JSX.Element[] } = {};

        for (const key in obj) {
            formattedText[key] = obj[key].split('\n').map((line, index) => <span key={index}>{line}<br/></span>);
        }
        return formattedText;
    };

    const formattedInformation = formatText(data.information);
    return (
        <div className="question">
            <div className="question__title">
                <h2><Translate obj={data.question} /></h2>

                <button onClick={toggleQuestion}>
                    <FontAwesomeIcon icon={questionIsOpen ? faChevronUp : faChevronDown} />
                </button>
            </div>

            <div className="question__text" style={{ display: questionIsOpen ? 'block' : 'none' }}>
                <p>
                    <TranslateQuestions obj={formattedInformation} />
                </p>
            </div>
        </div>
    )
}