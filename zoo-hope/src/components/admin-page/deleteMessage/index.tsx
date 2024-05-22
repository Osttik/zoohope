import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deletePet } from "../../../api/pets";
import { deleteContact } from "../../../api/contacts";
import { deleteHelpOption } from "../../../api/helpOptions";
import { deleteAdmin } from "../../../api/admins";
import { deleteHelpfulInfo } from "../../../api/helpfulInfo";
import { IPet } from "../../../define";
import { IContact } from "../../../define";
import { IHelpOption } from "../../../define";
import { IAdmin } from "../../../define";
import { IHelpfulInfo } from "../../../define";
import axios from "../../../api/axios";

interface IDeleteMessageProps {
  selectedPetRowIndex: null | number;
  selectedContactsRowIndex: null | number;
  selectedHelpRowIndex: null | number;
  selectedSettingsRowIndex: null | number;
  display: string;
  hideMessage: () => void;
  settings: any;
  setSettingsTableUpdate: any;
  selectedAdminsRowIndex: null | number;
  pets: IPet[];
  contacts: IContact[];
  helpOptions: IHelpOption[];
  admins: any;
  activeButton: string | null;
  setPetTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setContactsTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setHelpOptionsTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedHelpfulInfoRowIndex: null | number;
  helpfulInfo: IHelpfulInfo[];
  setHelpfulInfoTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteMessage = ({ 
    selectedPetRowIndex, 
    selectedContactsRowIndex, 
    selectedHelpRowIndex, 
    selectedSettingsRowIndex, 
    selectedAdminsRowIndex,
    settings,
    setSettingsTableUpdate,
    selectedHelpfulInfoRowIndex,
    display,
    hideMessage,
    pets,
    contacts,
    helpOptions,
    admins,
    helpfulInfo,
    activeButton,
    setPetTableUpdate,
    setContactsTableUpdate,
    setHelpOptionsTableUpdate,
    setAdminTableUpdate,
    setHelpfulInfoTableUpdate
}: IDeleteMessageProps) => {
    if (display === "none" ||
        (activeButton === 'pets' && selectedPetRowIndex === null) ||
        (activeButton === 'contacts' && selectedContactsRowIndex === null) ||
        (activeButton === 'help' && selectedHelpRowIndex === null) ||
        (activeButton === 'settings' && selectedSettingsRowIndex === null) ||
        (activeButton === 'admins' && selectedAdminsRowIndex === null) ||
        (activeButton === 'info' && selectedHelpfulInfoRowIndex === null)) {
        return null;
    }

    const selectedPet = selectedPetRowIndex !== null ? pets[selectedPetRowIndex] : null;
    const petId = selectedPet ? selectedPet._id : null;

    const selectedContact = selectedContactsRowIndex !== null ? contacts[selectedContactsRowIndex] : null;
    const contactId = selectedContact ? selectedContact._id : null;

    const selectedHelpOption = selectedHelpRowIndex !== null ? helpOptions[selectedHelpRowIndex] : null;
    const helpOptionId = selectedHelpOption ? selectedHelpOption._id : null;

    const selectedSetting = selectedSettingsRowIndex !== null ? settings[selectedSettingsRowIndex] : null;
    const settingId = selectedSetting ? selectedSetting._id : null;
    
    const selectedAdmin = selectedAdminsRowIndex !== null ? admins[selectedAdminsRowIndex] : null;
    const adminId = selectedAdmin ? selectedAdmin._id : null;
    
    const selectedHelpfulInfo = selectedHelpfulInfoRowIndex !== null ? helpfulInfo[selectedHelpfulInfoRowIndex] : null;
    const helpfulInfoId = selectedHelpfulInfo ? selectedHelpfulInfo._id : null;

    const deletePetCallback = async () => {
        try {
            if (petId) {
                await deletePet(petId);
                setPetTableUpdate((prev: boolean) => !prev);
            } else {
                console.error('Не розуміє id елемента');
            }
        } catch (error) {
            console.error('Помилка при видаленні елемента', error);
        }
    };

    const deleteContactCallback = async () => {
        try {
            if (contactId) {
                await deleteContact(contactId);
                setContactsTableUpdate((prev: boolean) => !prev);
            } else {
                console.error('Не розуміє id елемента');
            }
        } catch (error) {
            console.error('Помилка при видаленні елемента', error);
        }
    };

    const deleteHelpOptionCallback = async () => {
        try {
            if (helpOptionId) {
                await deleteHelpOption(helpOptionId);
                setHelpOptionsTableUpdate((prev: boolean) => !prev);
            } else {
                console.error('Не розуміє id елемента');
            }
        } catch (error) {
            console.error('Помилка при видаленні елемента', error);
        }
    };

        const deleteSettingCallback = async () => {
          try {
            if (settingId) {
              const response = await axios.delete(
                `http://localhost:5000/delete-setting/${settingId}`
              );
              console.log(response.data.message);
              setSettingsTableUpdate((prev: boolean) => !prev);
            } else {
              console.error("Не розуміє id елемента");
            }
          } catch (error) {
            console.error("Помилка при видаленні елемента", error);
          }
        };

    const deleteSelectedElement = () => {
        if (activeButton === null) {
            console.error('activeButton is null');
            return;
        }

        switch (true) {
            case activeButton.charAt(0) === 'p':
                if (petId) {
                    deletePetCallback().then(() => setPetTableUpdate((prev: boolean) => !prev))
                }
                break;
            case activeButton === 'contacts':
                if (contactId) {
                    deleteContactCallback().then(() => setContactsTableUpdate((prev: boolean) => !prev))
                }
                break;
            case activeButton === 'settings':
                deleteSettingCallback();
                break;
            case activeButton === 'help':
                if (helpOptionId) {
                    deleteHelpOptionCallback().then(() => setHelpOptionsTableUpdate((prev: boolean) => !prev))
                }
                break;
            case activeButton === 'info':
                if (helpfulInfoId) {
                    deleteHelpfulInfo(helpfulInfoId).then(() => setHelpfulInfoTableUpdate((prev: boolean) => !prev))
                }
                break;
            case activeButton === 'admins':
                if (adminId) {
                    deleteAdmin(adminId).then(() => setAdminTableUpdate((prev: boolean) => !prev))
                }
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