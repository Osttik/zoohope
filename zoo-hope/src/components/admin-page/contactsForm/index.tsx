import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../../images/logo/logo.png";
import { SetStateAction, useEffect, useState } from "react";
import { addContact, updateContact, getOneContact } from "../../../api/contacts";
import { IContact } from "../../../define";
import axios from "axios";
import { requestURL } from "../../../api/api";

interface IContactsFormProps {
    display: string;
    hideForm: () => void;
    setContactsTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    selectedContactsRowIndex: null | number;
    contacts: IContact[];
    setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    isEditBtnClicked: boolean;
}

export const ContactsForm = ({ display, hideForm, setContactsTableUpdate, selectedContactsRowIndex, contacts, setIsEditBtnClicked, isEditBtnClicked }: IContactsFormProps) => {
    const [nameEn, setNameEn] = useState<string>('');
    const [nameUa, setNameUa] = useState<string>('');
    const [contactUrl, setContactUrl] = useState<string>('');

    const [image, setImage] = useState<any>('');

    const [contactsData, setContactsData] = useState<any>(null);

    const selectedContact = selectedContactsRowIndex !== null ? contacts[selectedContactsRowIndex] : null;
    const contactId = selectedContact ? selectedContact._id : null;

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleAddContact = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                contactUrl.trim() !== ''
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const imgData = new FormData();
            imgData.append('image', image);

            const img = await axios.post('http://localhost:5000/upload-contact-image', imgData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim())
                },
                url: contactUrl.trim(),
                icon: img.data,
            }

            await addContact(formData);
            setContactsTableUpdate((prev: any) => !prev);

            cleanForm();
            hideForm();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    }

    const updateFormFields = () => {
        if (contactsData) {
            setNameEn(contactsData.name.en);
            setNameUa(contactsData.name.ua);
            setContactUrl(contactsData.url);
            setImage(contactsData.icon);
        }
    };

    const handleUpdateContact = async () => {
        try {
            const isFormValid = (
                nameEn.trim() !== '' &&
                nameUa.trim() !== '' &&
                contactUrl.trim() !== ''
            );

            if (!isFormValid) {
                return alert('Заповніть всі поля!');
            }

            const imgData = new FormData();
            imgData.append('image', image);

            const img = await axios.post('http://localhost:5000/upload-contact-image', imgData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const formData = {
                name: {
                    en: capitalizeFirstLetter(nameEn.trim()),
                    ua: capitalizeFirstLetter(nameUa.trim())
                },
                url: contactUrl.trim(),
                icon: img.data,
            }

            if (contactId){
                await updateContact(formData, contactId);
            }

            setContactsTableUpdate((prev: boolean) => !prev);

            cleanForm();
            hideForm();
            setIsEditBtnClicked(false);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    }

    const saveContact = () => {
        if (isEditBtnClicked === true) {
            handleUpdateContact();
        } else {
            handleAddContact();
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

    const handleContactsFileChange = (event: any) => {
        const file = event.target.files[0];
        
        if (file) {
            setImage(file);
        }
    };

    const cleanForm = () => {
        setNameEn('');
        setNameUa('');
        setContactUrl('');
        setImage('');
    }

    useEffect(() => {
        const fetchContactData = async () => {
            if (isEditBtnClicked && selectedContactsRowIndex !== null) {
                try {
                    if(contactId){
                        const data = await getOneContact(contactId);
                        setContactsData(data);
                    }
                } catch (error) {
                    console.error('Error fetch contacts data:', error);
                }
            }
        };

        fetchContactData();
    }, [isEditBtnClicked, selectedContactsRowIndex]);

    useEffect(() => {
        updateFormFields();
    }, [contactsData]);

    function deletePhoto() {
        setImage(null)
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
                            </div>

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
                                    <>
                                        <img
                                            src={image instanceof File ? URL.createObjectURL(image) : `${requestURL}/${image}`}
                                            alt="лого"
                                            className="contacts-form__image"
                                        />
                                        <button onClick={deletePhoto}>
                                            delete
                                        </button>
                                    </>
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