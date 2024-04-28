import { faAddressBook, faArrowRightFromBracket, faChevronDown, faChevronUp, faCircleUser, faHandshakeAngle, faPaw, faPlus } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/logo/logo.png"
import "../../styles/index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { PetInfoForm } from "./petInfoForm/index";
import { ContactsForm } from "./contactsForm/index";
import { HelpOptionForm } from "./helpOptionsForm/index";
import { DeleteBtn } from "./deleteBtn/index";
import { EditBtn } from "./editBtn/index";
import { DeleteMessage } from "./deleteMessage/index";
import { Table } from "./table";
import { IPet } from "../../define";
import { IContact } from "../../define";
import { IHelpOption } from "../../define";

export const AdminPage = () => {
    const [pets, setPets] = useState<IPet[]>([]);
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [helpOptions, setHelpOptions] = useState<IHelpOption[]>([]);

    const [petListIsOpen, setPetListIsOpen] = useState<boolean>(false);
    const [contactsListIsOpen, setContactsListIsOpen] = useState<boolean>(false);
    const [helpListIsOpen, setHelpListIsOpen] = useState<boolean>(false);
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

    const [activeButton, setActiveButton] = useState<string | null>(null);

    const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);

    const [displayPetForm, setDisplayPetForm] = useState<string>('none');
    const [displayContactsForm, setDisplayContactsForm] = useState<string>('none');
    const [displayHelpOptionForm, setDisplayHelpOptionForm] = useState<string>('none');
    const [displayDeleteMessage, setDisplayDeleteMessage] = useState<string>('none');

    const [selectedPetsRowIndex, setSelectedPetsRowIndex] = useState<null | number>(null);
    const [selectedContactsRowIndex, setSelectedContactsRowIndex] = useState<null | number>(null);
    const [selectedHelpRowIndex, setSelectedHelpRowIndex] = useState<null | number>(null);

    const [petTableUpdate, setPetTableUpdate] = useState<boolean>(false);
    const [contactsTableUpdate, setContactsTableUpdate] = useState<boolean>(false);
    const [helpOptionsTableUpdate, setHelpOptionsTableUpdate] = useState<boolean>(false);

    const handlePetRowClick = (index: number) => {
        setSelectedPetsRowIndex(index);
    };

    const handleContactRowClick = (index: number) => {
        setSelectedContactsRowIndex(index);
    };

    const handleHelpRowClick = (index: number) => {
        setSelectedHelpRowIndex(index);
    };

    const showPetForm = () => {
        setDisplayPetForm('block');
    };

    const hidePetForm = () => {
        setDisplayPetForm('none');
    };

    const showContactsForm = () => {
        setDisplayContactsForm('block');
    }

    const hideContactsForm = () => {
        setDisplayContactsForm('none');
    };

    const showHelpOptionForm = () => {
        setDisplayHelpOptionForm('block');
    }

    const hideHelpOptionForm = () => {
        setDisplayHelpOptionForm('none');
    };

    const showDeleteMessage = () => {
        setDisplayDeleteMessage('block');
    };

    const hideDeleteMessage = () => {
        setDisplayDeleteMessage('none');
    };

    const toggleButton = (buttonName: string | null) => {
        setActiveButton(buttonName === activeButton ? null : buttonName);
    };

    const togglePetList = () => {
        setPetListIsOpen(!petListIsOpen);
    };

    const toggleContactsList = () => {
        setContactsListIsOpen(!contactsListIsOpen);
    };

    const toggleHelpList = () => {
        setHelpListIsOpen(!helpListIsOpen);
    };

    const togglePopUp = () => {
        setPopupIsOpen(!popupIsOpen);
    };

    const openForm = () => {
        if (activeButton !== null && activeButton !== '' && activeButton.charAt(0) === 'p') {
            showPetForm();
        } else if (activeButton !== null && activeButton !== '' && activeButton === 'contacts') {
            showContactsForm();
        } else if (activeButton !== null && activeButton !== '' && activeButton === 'help') {
            showHelpOptionForm();
        } else {
            return
        }
    }
    return (
        <div className="admin-page">
            <div className="admin-page__container">
                <DeleteMessage
                    selectedPetRowIndex={selectedPetsRowIndex}
                    selectedContactsRowIndex={selectedContactsRowIndex}
                    selectedHelpRowIndex={selectedHelpRowIndex}
                    display={displayDeleteMessage}
                    hideMessage={hideDeleteMessage}
                    pets={pets}
                    contacts={contacts}
                    helpOptions={helpOptions}
                    activeButton={activeButton}
                    setPetTableUpdate={setPetTableUpdate}
                    setContactsTableUpdate={setContactsTableUpdate}
                    setHelpOptionsTableUpdate={setHelpOptionsTableUpdate}
                />

                <PetInfoForm
                    display={displayPetForm}
                    hideForm={hidePetForm}
                    setPetTableUpdate={setPetTableUpdate}
                    setIsEditBtnClicked={setIsEditBtnClicked}
                    isEditBtnClicked={isEditBtnClicked}
                    pets={pets}
                    selectedPetsRowIndex={selectedPetsRowIndex}
                />

                <ContactsForm
                    display={displayContactsForm}
                    hideForm={hideContactsForm}
                    setContactsTableUpdate={setContactsTableUpdate}
                    selectedContactsRowIndex={selectedContactsRowIndex}
                    contacts={contacts}
                    setIsEditBtnClicked={setIsEditBtnClicked}
                    isEditBtnClicked={isEditBtnClicked}
                />

                <HelpOptionForm
                    display={displayHelpOptionForm}
                    hideForm={hideHelpOptionForm}
                    setHelpOptionsTableUpdate={setHelpOptionsTableUpdate}
                    isEditBtnClicked={isEditBtnClicked}
                    selectedHelpRowIndex={selectedHelpRowIndex}
                    helpOptions={helpOptions}
                    setIsEditBtnClicked={setIsEditBtnClicked}
                />

                <div className="sidebar">
                    <div className="sidebar__container">
                        <div className="sidebar-top__container">
                            <img src={Logo} alt="zoonadiya-logo" className="sidebar-top__logo" />

                            <p className="sidebar-top__title">Адмін Сторінка</p>
                        </div>

                        <div className="sidebar-main">
                            <div className="sidebar-main__container">
                                <div className="sidebar-options">
                                    <div className="sidebar-options__container">
                                        <div className="sidebar-option">
                                            <div className="sidebar-option__container">
                                                <div className="sidebar-option__logo">
                                                    <FontAwesomeIcon icon={faPaw} />
                                                </div>

                                                <p className="sidebar-option__title">тварини</p>

                                                <button className="sidebar-option__dropdown-btn" onClick={togglePetList}>
                                                    <FontAwesomeIcon icon={petListIsOpen ? faChevronUp : faChevronDown} />
                                                </button>
                                            </div>

                                            <div className="sidebar-option-list" style={{ display: petListIsOpen ? 'block' : 'none' }}>
                                                <ul className="sidebar-option-list__container">
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'p pets' ? 'active' : ''}`} onClick={() => toggleButton('p pets')}>всі тварини</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'p cats' ? 'active' : ''}`} onClick={() => toggleButton('p cats')}>коти</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'p dogs' ? 'active' : ''}`} onClick={() => toggleButton('p dogs')}>песики</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'p treatment' ? 'active' : ''}`} onClick={() => toggleButton('p treatment')}>потребують лікування</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'p adopted' ? 'active' : ''}`} onClick={() => toggleButton('p adopted')}>отримали дім</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'p temporary' ? 'active' : ''}`} onClick={() => toggleButton('p temporary')}>на тимчасовому перетримані</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="sidebar-option">
                                            <div className="sidebar-option__container">
                                                <div className="sidebar-option__logo">
                                                    <FontAwesomeIcon icon={faAddressBook} />
                                                </div>

                                                <p className="sidebar-option__title">контакти</p>

                                                <button className="sidebar-option__dropdown-btn" onClick={toggleContactsList}>
                                                    <FontAwesomeIcon icon={contactsListIsOpen ? faChevronUp : faChevronDown} />
                                                </button>
                                            </div>

                                            <div className="sidebar-option-list" style={{ display: contactsListIsOpen ? 'block' : 'none' }}>
                                                <ul className="sidebar-option-list__container">
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'contacts' ? 'active' : ''}`} onClick={() => toggleButton('contacts')}>всі контакти</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="sidebar-option">
                                            <div className="sidebar-option__container">
                                                <div className="sidebar-option__logo">
                                                    <FontAwesomeIcon icon={faHandshakeAngle} />
                                                </div>

                                                <p className="sidebar-option__title">варіанти допомоги</p>

                                                <button className="sidebar-option__dropdown-btn" onClick={toggleHelpList}>
                                                    <FontAwesomeIcon icon={helpListIsOpen ? faChevronUp : faChevronDown} />
                                                </button>
                                            </div>

                                            <div className="sidebar-option-list" style={{ display: helpListIsOpen ? 'block' : 'none' }}>
                                                <ul className="sidebar-option-list__container">
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'help' ? 'active' : ''}`} onClick={() => toggleButton('help')}>всі варіанти допомоги</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-user">
                                    <div className="sidebar-user__container">
                                        <div className="sidebar-user__content">
                                            <div className="sidebar-user-info">
                                                <div className="sidebar-user-info__logo">
                                                    <FontAwesomeIcon icon={faCircleUser} />
                                                </div>

                                                <p className="sidebar-user-info__name">Регіна Тодоренко</p>
                                            </div>

                                            <div className="sidebar-user-menu">
                                                <div className="sidebar-user-menu__container">
                                                    <button onClick={togglePopUp} className="sidebar-user-menu__btn">
                                                        <span></span>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sidebar-user-popup" style={{ display: popupIsOpen ? 'block' : 'none' }}>
                                            <div className="sidebar-user-popup__container">
                                                <div className="sidebar-user-popup__btn">
                                                    <p>вийти</p>
                                                    <div className="sidebar-user-popup__btn-logo">
                                                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main">
                    <div className="main__container">
                        <div className="actions">
                            <div className="actions__container">
                                <EditBtn
                                    selectedPetRowIndex={selectedPetsRowIndex}
                                    setSelectedPetsRowIndex={setSelectedPetsRowIndex}
                                    selectedContactsRowIndex={selectedContactsRowIndex}
                                    setSelectedContactsRowIndex={setSelectedContactsRowIndex}
                                    selectedHelpRowIndex={selectedHelpRowIndex}
                                    setSelectedHelpRowIndex={setSelectedHelpRowIndex}
                                    activeButton={activeButton}
                                    showPetForm={showPetForm}
                                    showContactsForm={showContactsForm}
                                    showHelpOptionForm={showHelpOptionForm}
                                    setIsEditBtnClicked={setIsEditBtnClicked}
                                />

                                <DeleteBtn
                                    selectedPetRowIndex={selectedPetsRowIndex}
                                    setSelectedPetsRowIndex={setSelectedPetsRowIndex}
                                    selectedContactsRowIndex={selectedContactsRowIndex}
                                    setSelectedContactsRowIndex={setSelectedContactsRowIndex}
                                    selectedHelpRowIndex={selectedHelpRowIndex}
                                    setSelectedHelpRowIndex={setSelectedHelpRowIndex}
                                    showMessage={showDeleteMessage}
                                    activeButton={activeButton}
                                />

                                <button className="actions__add-btn" onClick={openForm}>
                                    <FontAwesomeIcon icon={faPlus} className="actions__add-btn-logo" />

                                    <p>додати</p>
                                </button>
                            </div>
                        </div>

                        <div className="main-content">
                            <div className="main-content__container">
                                {activeButton !== null ? (
                                    <Table
                                        activeButton={activeButton}
                                        pets={pets}
                                        setPets={setPets}
                                        contacts={contacts}
                                        setContacts={setContacts}
                                        helpOptions={helpOptions}
                                        setHelpOptions={setHelpOptions}
                                        selectedPetsRowIndex={selectedPetsRowIndex}
                                        handlePetRowClick={handlePetRowClick}
                                        selectedContactsRowIndex={selectedContactsRowIndex}
                                        handleContactRowClick={handleContactRowClick}
                                        selectedHelpRowIndex={selectedHelpRowIndex}
                                        handleHelpRowClick={handleHelpRowClick}
                                        petTableUpdate={petTableUpdate}
                                        contactsTableUpdate={contactsTableUpdate}
                                        helpOptionsTableUpdate={helpOptionsTableUpdate}
                                    />
                                ) : (
                                    <div className="main-content__greeting">
                                        <p className="greeting__title">Вітаємо!</p>
                                        <p className="greeting__caption">оберіть категорію, щоб побачити інформацію і мати змогу додати нову</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}