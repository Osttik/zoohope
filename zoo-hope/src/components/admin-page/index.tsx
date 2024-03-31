import { faAddressBook, faArrowRightFromBracket, faChevronDown, faChevronUp, faCircleUser, faHandshakeAngle, faPaw, faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/logo/logo.png"
import "../../styles/index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { PetTable } from "./petTable";
import { ContactsTable } from "./contactsTable";
import { HelpOptionsTable } from "./helpOptionsTable";
import { PetInfoForm } from "./petInfoForm";

export const AdminPage = () => {
    const [petListIsOpen, setPetListIsOpen] = useState<boolean>(false);
    const [contactsListIsOpen, setContactsListIsOpen] = useState<boolean>(false);
    const [helpListIsOpen, setHelpListIsOpen] = useState<boolean>(false);
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

    const [activeButton, setActiveButton] = useState<string | null>(null);

    const [displayForm, setDisplayForm] = useState('none');

    const [selectedRowIndex, setSelectedRowIndex] = useState<null | number>(null);

    const handleRowClick = (index: number) => {
        setSelectedRowIndex(index);
    };

    const showForm = () => {
        setDisplayForm('block');
    };

    const hideForm = () => {
        setDisplayForm('none');
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
    return (
        <div className="admin-page">
            <div className="admin-page__container">
                <PetInfoForm display={displayForm} hideForm={hideForm} />
                <div className="sidebar">
                    <div className="sidebar__container">
                        <div className="sidebar-top__container">
                            <img src={Logo} alt="zoonadiya-logo" className="sidebar-top__logo" />

                            <p className="sidebar-top__title">Адмін-Сторінка</p>
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
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'pets' ? 'active' : ''}`} onClick={() => toggleButton('pets')}>всі тварини</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'cats' ? 'active' : ''}`} onClick={() => toggleButton('cats')}>коти</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'dogs' ? 'active' : ''}`} onClick={() => toggleButton('dogs')}>собаки</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'treatment' ? 'active' : ''}`} onClick={() => toggleButton('treatment')}>потребують лікування</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'adopted' ? 'active' : ''}`} onClick={() => toggleButton('adopted')}>отримали дім</button>
                                                    </li>
                                                    <li className="sidebar-option-list__option">
                                                        <button className={`sidebar-option-list__option-button ${activeButton === 'temporary' ? 'active' : ''}`} onClick={() => toggleButton('temporary')}>на тимчасовому перетримані</button>
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
                                <abbr title="редагувати">
                                    <button className="actions__edit-btn" style={{ display: selectedRowIndex !== null ? 'block' : 'none' }}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </abbr>
                                <abbr title="видалити">
                                    <button className="actions__delete-btn" style={{ display: selectedRowIndex !== null ? 'block' : 'none' }}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </abbr>
                                <button className="actions__add-btn" onClick={showForm}>
                                    <FontAwesomeIcon icon={faPlus} className="actions__add-btn-logo" />

                                    <p>додати</p>
                                </button>
                            </div>
                        </div>

                        <div className="main-content">
                            <div className="main-content__container">
                                {activeButton === 'pets' && <PetTable url={'get-all-pets'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'cats' && <PetTable url={'get-all-pets'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'dogs' && <PetTable url={'get-all-pets'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'treatment' && <PetTable url={'get-all-pets'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'adopted' && <PetTable url={'get-all-pets'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'temporary' && <PetTable url={'get-all-pets'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'contacts' && <ContactsTable url={'get-all-contacts'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === 'help' && <HelpOptionsTable url={'get-all-help-options'} activeButton={activeButton} selectedRowIndex={selectedRowIndex} handleRowClick={handleRowClick}/>}
                                {activeButton === null && (
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