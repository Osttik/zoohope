import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";

interface IContactsFormProps {
    display: string;
    hideForm: () => void;
    setContactsTableUpdate: any;
    selectedContactsRowIndex: null | number;
    contacts: any;
    setIsEditBtnClicked: any;
    isEditBtnClicked: boolean;
}

export const ContactsForm = ({ display, hideForm, setContactsTableUpdate, selectedContactsRowIndex, contacts, setIsEditBtnClicked, isEditBtnClicked }: IContactsFormProps) => {
    const [nameEn, setNameEn] = useState<string>('');
    const [nameUa, setNameUa] = useState<string>('');
    const [contactUrl, setContactUrl] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');

    const [image, setImage] = useState<string>('');

    const [contactsData, setContactsData] = useState<any>(null);

    const selectedContact = selectedContactsRowIndex !== null ? contacts[selectedContactsRowIndex] : null;
    const contactId = selectedContact ? selectedContact._id : null;

    const fetchContactsData = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/get-contact/${id}`);
            setContactsData(response.data);
        } catch (error) {
            console.error('Error fetching contacts data:', error);
        }
    };

    const updateFormFields = () => {
        if (contactsData) {
            setNameEn(contactsData.name.en);
            setNameUa(contactsData.name.ua);
            setContactUrl(contactsData.url);

            if (contactsData.icon && !image) {
                setImage('');
                setIconUrl(contactsData.icon);
            } else {
                setImage(contactsData.icon); 
                setIconUrl(''); 
            }
        }
    };

    useEffect(() => {
        if (isEditBtnClicked && selectedContactsRowIndex !== null) {
            fetchContactsData(contactId);
        }
    }, [isEditBtnClicked, selectedContactsRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [contactsData]);


    const handleContactsFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setImage(fileURL);
        }
    };

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const addContact = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                contactUrl.trim() !== '' &&
                (iconUrl.trim() !== '' || image !== '')
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim())
                },
                url: contactUrl.trim(),
                icon: image ? image : iconUrl.trim(),
            }

            const response = await axios.post('http://localhost:5000/add-contact', formData);
            setContactsTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();

            console.log('Contact added successfully:', response.data);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    }

    const updateContact = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                contactUrl.trim() !== '' &&
                (iconUrl.trim() !== '' || image !== '')
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim())
                },
                url: contactUrl.trim(),
                icon: image ? image : iconUrl.trim(),
            }

            const response = await axios.put(`http://localhost:5000/update-contact/${contactId}`, formData);
            setContactsTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();
            setIsEditBtnClicked(false);

            console.log('Contact updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    }

    const saveContact = () => {
        if (isEditBtnClicked === true) {
            updateContact();
        } else {
            addContact();
        }
    }

    const handleNameEnChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNameEn(e.target.value);
    };

    const handleNameUaChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNameUa(e.target.value);
    };

    const handleContactUrlChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setContactUrl(e.target.value);
    };

    const handleIconUrlChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setIconUrl(e.target.value);
    };

    const cleanForm = () => {
        setNameEn('');
        setNameUa('');
        setContactUrl('');
        setIconUrl('');
        setImage('');
    }
    return (
        <div className="contacts-form" style={{ display: display }}>
            <div className="contacts-form__container">
                <div className="contacts-form__close-btn">
                    <button onClick={() => { hideForm(); cleanForm(); setIsEditBtnClicked(false) }}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="contacts-form__header">
                    <img src={Logo} alt="zoonadiya-logo" className="contacts-form__logo" />
                    <div className="contacts-form__title">Форма для заповнення контактних даних</div>
                </div>

                <form className="contacts-form__form" action="/" method="post">
                    <div className="contacts-form__form-content">
                        <div className="contacts-form-ua">
                            <div className="contacts-form-ua__title">Дані до першочергового заповнення:</div>

                            <input
                                className="contacts-form-ua__input name"
                                type="text"
                                placeholder="Назва"
                                value={nameUa}
                                onChange={handleNameUaChange}
                            />

                            <input
                                className="contacts-form-ua__input link"
                                type="text"
                                placeholder="Посилання, номер телефону, email"
                                value={contactUrl}
                                onChange={handleContactUrlChange}
                            />

                            <div className="contacts-form-ua__icon">
                                <p className="contacts-form-ua__icon-title">Додати іконку:</p>

                                <p className="contacts-form-ua__icon-caption">Виберіть одне з двох:</p>
                            </div>

                            <input
                                className="contacts-form-ua__input link"
                                type="text"
                                placeholder="Додати посилання"
                                value={iconUrl}
                                onChange={handleIconUrlChange}
                            />

                            <p className="contacts-form-ua__icon-caption">або</p>

                            <div className="contacts-form__files">
                                <label htmlFor="contact-image" className="contacts-form__files-lable">Завантажити фото</label>
                                <input
                                    type="file"
                                    name="contact-image"
                                    id="contact-image"
                                    className="contacts-form__files-input"
                                    accept="image/*"
                                    onChange={handleContactsFileChange}
                                />
                            </div>

                            <div className="contacts-form__images">
                                {image && (
                                    <img
                                        src={image}
                                        alt="лого"
                                        className="contacts-form__image"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="contacts-form-en">
                            <div className="contacts-form-en__title">Дані, які потребують перекладу: </div>

                            <input
                                className="contacts-form-en__input name"
                                type="text"
                                placeholder="Name"
                                value={nameEn}
                                onChange={handleNameEnChange}
                            />
                        </div>
                    </div>

                    <div className="contacts-form__add-btn">
                        <button type="button" onClick={saveContact}>
                            <FontAwesomeIcon icon={faPlus} className="contacts-form__add-btn-logo" />

                            <p>додати</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}