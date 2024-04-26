import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface IHelpOptionFormProps {
    display: string;
    hideForm: () => void;
    setHelpOptionsTableUpdate: any;
    isEditBtnClicked: boolean;
    selectedHelpRowIndex: null | number;
    helpOptions: any;
    setIsEditBtnClicked: any;
}

export const HelpOptionForm = ({ display, hideForm, setHelpOptionsTableUpdate, isEditBtnClicked, selectedHelpRowIndex, helpOptions, setIsEditBtnClicked }: IHelpOptionFormProps) => {
    const [nameEn, setNameEn] = useState<string>('');
    const [nameUa, setNameUa] = useState<string>('');
    const [descriptionEn, setDescriptionEn] = useState<string>('');
    const [descriptionUa, setDescriptionUa] = useState<string>('');

    const [helpOptionData, setHelpOptionData] = useState<any>(null);

    const selectedHelpOption = selectedHelpRowIndex !== null ? helpOptions[selectedHelpRowIndex] : null;
    const helpOptionId = selectedHelpOption ? selectedHelpOption._id : null;

    const fetchHelpOptionData = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/get-help-option/${id}`);
            setHelpOptionData(response.data);
        } catch (error) {
            console.error('Error fetching help option data:', error);
        }
    };

    const updateFormFields = () => {
        if (helpOptionData) {
            setNameEn(helpOptionData.name.en);
            setNameUa(helpOptionData.name.ua);
            setDescriptionEn(helpOptionData.description.en);
            setDescriptionUa(helpOptionData.description.ua);
        }
    };

    useEffect(() => {
        if (isEditBtnClicked && selectedHelpRowIndex !== null) {
            fetchHelpOptionData(helpOptionId);
        }
    }, [isEditBtnClicked, selectedHelpRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [helpOptionData]);


    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const editHelpOption = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                descriptionEn.trim() !== '' &&
                descriptionUa.trim() !== ''
            );

            if (!isFormValid) {
                alert('Заповніть всі поля!');
                return;
            }

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim())
                },
                description: {
                    en: capitalizeFirstLetter(descriptionEn.trim()),
                    ua: capitalizeFirstLetter(descriptionUa.trim())
                }
            };

            const response = await axios.put(`http://localhost:5000/update-help-option/${helpOptionId}`, formData);
            setHelpOptionsTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();
            setIsEditBtnClicked(false);
            
            console.log('Help option edited successfully:', response.data);
        } catch (error) {
            console.error('Error editing help option:', error);
        }
    };

    const addHelpOption = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                descriptionEn.trim() !== '' &&
                descriptionUa.trim() !== '' 
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim())
                },
                description: {
                    en: capitalizeFirstLetter(descriptionEn.trim()),
                    ua: capitalizeFirstLetter(descriptionUa.trim())
                }
            }

            const response = await axios.post('http://localhost:5000/add-help-option', formData);
            setHelpOptionsTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm(); 

            console.log('Help option added successfully:', response.data);
        } catch (error) {
            console.error('Error adding help option:', error);
        }
    }

    const saveHelpOption = () => {
        if (isEditBtnClicked === true) {
            editHelpOption();
        } else {
            addHelpOption();
        }
    }

    const handleNameEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNameEn(e.target.value);
    };

    const handleNameUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNameUa(e.target.value);
    };

    const handleDescriptionEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setDescriptionEn(e.target.value);
    };

    const handleDescriptionUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setDescriptionUa(e.target.value);
    };

    const cleanForm = () => {
        setNameEn('');
        setNameUa('');
        setDescriptionEn('');
        setDescriptionUa('');
    }
    return (
        <div className="help-option-form" style={{ display: display }}>
            <div className="help-option-form__container">
                <div className="help-option-form__close-btn">
                    <button onClick={() => { hideForm(); cleanForm(); setIsEditBtnClicked(false)}}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="help-option-form__header">
                    <img src={Logo} alt="zoonadiya-logo" className="help-option-form__logo" />
                    <div className="help-option-form__title">Форма для заповнення варіантів допомоги</div>
                </div>

                <form className="help-option-form__form" action="/" method="post">
                    <div className="help-option-form__form-content">
                        <div className="help-option-form-ua">
                            <div className="help-option-form-ua__title">Дані до першочергового заповнення:</div>

                            <input
                                className="help-option-form-ua__input name"
                                type="text"
                                placeholder="Назва"
                                value={nameUa}
                                onChange={handleNameUaChange}
                            />

                            <textarea
                                className="help-option-form-ua__textarea"
                                id="description"
                                placeholder="Опис"
                                value={descriptionUa}
                                onChange={handleDescriptionUaChange}>
                            </textarea>
                        </div>

                        <div className="help-option-form-en">
                            <div className="help-option-form-en__title">Дані, які потребують перекладу: </div>

                            <input
                                className="help-option-form-en__input name"
                                type="text"
                                placeholder="Name"
                                value={nameEn}
                                onChange={handleNameEnChange}
                            />

                            <textarea
                                className="help-option-form-en__textarea"
                                id="description"
                                placeholder="Description"
                                value={descriptionEn}
                                onChange={handleDescriptionEnChange}>
                            </textarea>
                        </div>
                    </div>

                    <div className="help-option-form__add-btn">
                        <button type="button" onClick={saveHelpOption}>
                            <FontAwesomeIcon icon={faPlus} className="help-option-form__add-btn-logo" />

                            <p>додати</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}