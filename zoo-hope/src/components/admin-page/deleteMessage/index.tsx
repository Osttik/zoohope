import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

interface IDeleteMessageProps {
    selectedPetRowIndex: null | number;
    selectedContactsRowIndex: null | number;
    selectedHelpRowIndex: null | number;
    display: string;
    hideMessage: () => void;
    pets: any;
    contacts: any;
    helpOptions: any
    activeButton: string | null;
    setPetTableUpdate: any;
    setContactsTableUpdate: any;
    setHelpOptionsTableUpdate: any;
}

export const DeleteMessage = ({ selectedPetRowIndex, selectedContactsRowIndex, selectedHelpRowIndex, display, hideMessage, pets, contacts, helpOptions, activeButton, setPetTableUpdate, setContactsTableUpdate, setHelpOptionsTableUpdate }: IDeleteMessageProps) => {
    if (display === "none" ||
        (activeButton === 'pets' && selectedPetRowIndex === null) ||
        (activeButton === 'contacts' && selectedContactsRowIndex === null) ||
        (activeButton === 'help' && selectedHelpRowIndex === null)) {
        return null;
    }

    const selectedPet = selectedPetRowIndex !== null ? pets[selectedPetRowIndex] : null;
    const petId = selectedPet ? selectedPet._id : null;

    const selectedContact = selectedContactsRowIndex !== null ? contacts[selectedContactsRowIndex] : null;
    const contactId = selectedContact ? selectedContact._id : null;

    const selectedHelpOption = selectedHelpRowIndex !== null ? helpOptions[selectedHelpRowIndex] : null;
    const helpOptionId = selectedHelpOption ? selectedHelpOption._id : null;

    const deletePet = async () => {
        try {
            if (petId) {
                const response = await axios.delete(`http://localhost:5000/delete-pet/${petId}`);
                console.log(response.data.message);
                setPetTableUpdate((prev: boolean) => !prev);
            } else {
                console.error('Не розуміє id елемента');
            }
        } catch (error) {
            console.error('Помилка при видаленні елемента', error);
        }
    };

    const deleteContact = async () => {
        try {
            if (contactId) {
                const response = await axios.delete(`http://localhost:5000/delete-contact/${contactId}`);
                console.log(response.data.message);
                setContactsTableUpdate((prev: boolean) => !prev);
            } else {
                console.error('Не розуміє id елемента');
            }
        } catch (error) {
            console.error('Помилка при видаленні елемента', error);
        }
    };

    const deleteHelpOption = async () => {
        try {
            if (helpOptionId) {
                const response = await axios.delete(`http://localhost:5000/delete-help-option/${helpOptionId}`);
                console.log(response.data.message);
                setHelpOptionsTableUpdate((prev: boolean) => !prev);
            } else {
                console.error('Не розуміє id елемента');
            }
        } catch (error) {
            console.error('Помилка при видаленні елемента', error);
        }
    };

    const deleteSelectedElement = () => {
        if (activeButton === null) {
            console.error('activeButton is null');
            return;
        }

        switch (true) {
            case activeButton.charAt(0) === 'p':
                deletePet();
                break;
            case activeButton === 'contacts':
                deleteContact();
                break;
            case activeButton === 'help':
                deleteHelpOption();
                break;
        }
    }
    return (
        <div className="delete-message" style={{ display: display }}>
            <div className="delete-message__container">
                <div className="delete-message__close-btn">
                    <button onClick={hideMessage}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className="delete-message__message">
                    <h1 className="message__title">Ви точно хочете видалити цей елемент?</h1>

                    <p className="message__caption">Натиснувши на кнопку <b>«видалити»</b> ви погоджуєтесь видалити всю інформацію про обраний об'єкт <b>назавжди</b>. Дані буде неможливо повернути.</p>
                </div>

                <div className="delete-message__buttons">
                    <button className="buttons__cancel-btn" onClick={hideMessage}>скасувати</button>

                    <button className="buttons__delete-btn" onClick={() => { deleteSelectedElement(); hideMessage(); }}>видалити назавжди</button>
                </div>
            </div>
        </div>
    )
}