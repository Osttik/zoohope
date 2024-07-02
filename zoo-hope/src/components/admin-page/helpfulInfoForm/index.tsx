import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import { IHelpfulInfo } from "../../../define";
import { SetStateAction, useEffect, useState } from "react";
import { addHelpfulInfo, editHelpfulInfo, getOneHelpfulInfo } from "../../../api/helpfulInfo";

interface IHelpfulInfoFormProps {
    display: string;
    hideForm: () => void;
    setHelpfulInfoTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    isEditBtnClicked: boolean;
    selectedHelpfulInfoRowIndex: null | number;
    helpfulInfo: IHelpfulInfo[];
    setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HelpfulInfoForm = ({ display, hideForm, setHelpfulInfoTableUpdate, isEditBtnClicked, selectedHelpfulInfoRowIndex, helpfulInfo, setIsEditBtnClicked }: IHelpfulInfoFormProps) => {
    const [questionEn, setQuestionEn] = useState<string>('');
    const [questionUa, setQuestionUa] = useState<string>('');
    const [infoEn, setInfoEn] = useState<string>('');
    const [infoUa, setInfoUa] = useState<string>('');

    const [helpfulInfoData, setHelpfulInfoData] = useState<any>(null);

    const selectedHelpfulInfo = selectedHelpfulInfoRowIndex !== null ? helpfulInfo[selectedHelpfulInfoRowIndex] : null;
    const helpfulInfoId = selectedHelpfulInfo ? selectedHelpfulInfo._id : null;

    const handleAddNewQuestion = async () => {
        try {
            const isFormValid = (
                questionEn.trim() !== '' &&
                questionUa.trim() !== '' &&
                infoEn.trim() !== '' &&
                infoUa.trim() !== ''
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
                question: {
                    en: questionEn.toLocaleLowerCase().trim(),
                    ua: questionUa.toLocaleLowerCase().trim()
                },
                information: {
                    en: infoEn.trim(),
                    ua: infoUa.trim()
                }
            }

            await addHelpfulInfo(formData);
            setHelpfulInfoTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();

            console.log(helpfulInfo);
            
        } catch (error) {
            console.error('Error adding new question:', error);
        }
    }

    const updateFormFields = () => {
        if (helpfulInfoData) {
            setQuestionEn(helpfulInfoData.question.en);
            setQuestionUa(helpfulInfoData.question.ua);
            setInfoEn(helpfulInfoData.information.en);
            setInfoUa(helpfulInfoData.information.ua);
        }
    };

    const handleEditQuestion = async () => {
        try {
            const isFormValid = (
                questionEn.trim() !== '' &&
                questionUa.trim() !== '' &&
                infoEn.trim() !== '' &&
                infoUa.trim() !== ''
            );

            if (!isFormValid) {
                alert('Заповніть всі поля!');
                return;
            }

            const formData = {
                question: {
                    en: questionEn.toLocaleLowerCase().trim(),
                    ua: questionUa.toLocaleLowerCase().trim()
                },
                information: {
                    en: infoEn.trim(),
                    ua: infoUa.trim()
                }
            };

            if (helpfulInfoId) {
                await editHelpfulInfo(formData, helpfulInfoId);
            }
            setHelpfulInfoTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();
            setIsEditBtnClicked(false);

        } catch (error) {
            console.error('Error editing question:', error);
        }
    };

    const saveHelpfulInfo = () => {
        if (isEditBtnClicked === true) {
            handleEditQuestion();
        } else {
            handleAddNewQuestion();
        }
    }
    
    const handleQuestionEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setQuestionEn(e.target.value);
    };

    const handleQuestionUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setQuestionUa(e.target.value);
    };

    const handleInfoEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInfoEn(e.target.value);
    };

    const handleInfoUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInfoUa(e.target.value);
    };

    const cleanForm = () => {
        setQuestionEn('');
        setQuestionUa('');
        setInfoEn('');
        setInfoUa('');
    }

    useEffect(() => {
        const fetchHelpfulInfoData = async () => {
            if (isEditBtnClicked && selectedHelpfulInfoRowIndex !== null) {
                try {
                    if (helpfulInfoId) {
                        const data = await getOneHelpfulInfo(helpfulInfoId);
                        setHelpfulInfoData(data);
                    }
                } catch (error) {
                    console.error('Error fetch help option data:', error);
                }
            }
        };

        fetchHelpfulInfoData();
    }, [isEditBtnClicked, selectedHelpfulInfoRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [helpfulInfoData]);
    return (
        <div className="helpful-info-form" style={{ display: display }}>
            <div className="helpful-info-form__container">
                <div className="helpful-info-form__close-btn">
                    <button onClick={() => { hideForm(); cleanForm(); setIsEditBtnClicked(false) }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="helpful-info-form__header">
                    <img src={Logo} alt="zoonadiya-logo" className="helpful-info-form__logo" />
                    <div className="helpful-info-form__title">Форма для заповнення корисної інформації</div>
                </div>

                <form className="helpful-info-form__form" action="/" method="post">
                    <div className="helpful-info-form__form-content">
                        <div className="helpful-info-form-ua">
                            <div className="helpful-info-form-ua__title">Дані до першочергового заповнення:</div>

                            <input
                                className="helpful-info-form-ua__input name"
                                type="text"
                                placeholder="Назва/питання"
                                value={questionUa}
                                onChange={handleQuestionUaChange}
                            />

                            <textarea
                                className="helpful-info-form-ua__textarea"
                                id="description"
                                placeholder="Інформація"
                                value={infoUa}
                                onChange={handleInfoUaChange}>
                            </textarea>
                        </div>

                        <div className="helpful-info-form-en">
                            <div className="helpful-info-form-en__title">Дані, які потребують перекладу: </div>

                            <input
                                className="helpful-info-form-en__input name"
                                type="text"
                                placeholder="Name/question"
                                value={questionEn}
                                onChange={handleQuestionEnChange}
                            />

                            <textarea
                                className="helpful-info-form-en__textarea"
                                id="description"
                                placeholder="Information"
                                value={infoEn}
                                onChange={handleInfoEnChange}>
                            </textarea>
                        </div>
                    </div>

                    <div className="helpful-info-form__add-btn">
                        <button type="button" onClick={saveHelpfulInfo}>
                            <FontAwesomeIcon icon={faPlus} className="helpful-info-form__add-btn-logo" />

                            <p>додати</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}