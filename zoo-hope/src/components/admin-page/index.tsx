import {
  faAddressBook,
  faArrowRightFromBracket,
  faChevronDown,
  faChevronUp,
  faCircleUser,
  faHandshakeAngle,
  faPaw,
  faPlus,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/logo/logo.png";
import "../../styles/index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useEffect, useState } from "react";
import { PetTable } from "./petTable/index";
import { ContactsTable } from "./contactsTable/index";
import { HelpOptionsTable } from "./helpOptionsTable/index";
import { PetInfoForm } from "./petInfoForm/index";
import { ContactsForm } from "./contactsForm/index";
import { HelpOptionForm } from "./helpOptionsForm/index";
import { AdminForm } from "./adminForm";
import { DeleteBtn } from "./deleteBtn/index";
import { EditBtn } from "./editBtn/index";
import { DeleteMessage } from "./deleteMessage/index";
import { Table } from "./table";
import { IAdmin } from "../../define";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { SettingsTable } from "./settingsTable";
import { SettingsForm } from "./settingsForm";
import { IContact, IHelpOption, IPet, ISetting } from "../../define";

interface IDecodedToken {
  name: string;
  email: string;
  role: string;
}

export const AdminPage = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [helpOptions, setHelpOptions] = useState<IHelpOption[]>([]);
  const [settings, setSettings] = useState<ISetting[]>([]);
  const [petListIsOpen, setPetListIsOpen] = useState<boolean>(false);
  const [contactsListIsOpen, setContactsListIsOpen] = useState<boolean>(false);
  const [helpListIsOpen, setHelpListIsOpen] = useState<boolean>(false);
  const [settingsListIsOpen, setSettingsListIsOpen] = useState<boolean>(false);
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<IDecodedToken | undefined>(undefined);

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);
  
  const [displayPetForm, setDisplayPetForm] = useState<string>('none');
  const [displayContactsForm, setDisplayContactsForm] = useState<string>('none');
  const [displaySettingForm, setDisplaySettingForm] = useState<string>("none");
  const [displayHelpOptionForm, setDisplayHelpOptionForm] = useState<string>('none');
  const [displayAdminForm, setDisplayAdminForm] = useState<string>('none');

  const [displayDeleteMessage, setDisplayDeleteMessage] = useState<string>('none');

  const [selectedPetsRowIndex, setSelectedPetsRowIndex] = useState<null | number>(null);
  const [selectedContactsRowIndex, setSelectedContactsRowIndex] = useState<null | number>(null);
  const [selectedHelpRowIndex, setSelectedHelpRowIndex] = useState<null | number>(null);
  const [selectedAdminsRowIndex, setSelectedAdminsRowIndex] = useState<null | number>(null);
  const [selectedSettingsRowIndex, setSelectedSettingsRowIndex] = useState<null | number>(null);

  const [petTableUpdate, setPetTableUpdate] = useState<boolean>(false);
  const [contactsTableUpdate, setContactsTableUpdate] = useState<boolean>(false);
  const [helpOptionsTableUpdate, setHelpOptionsTableUpdate] = useState<boolean>(false);
  const [adminTableUpdate, setAdminTableUpdate] = useState<boolean>(false);
  const [settingsTableUpdate, setSettingsTableUpdate] = useState<boolean>(false);


  const handlePetRowClick = (index: number) => {
    setSelectedPetsRowIndex(index);
  };

  const handleContactRowClick = (index: number) => {
    setSelectedContactsRowIndex(index);
  };

  const handleHelpRowClick = (index: number) => {
    setSelectedHelpRowIndex(index);
  };

  const handleSettingRowClick = (index: number) => {
    setSelectedSettingsRowIndex(index);
  }

  const handleAdminRowClick = (index: number) => {
    setSelectedAdminsRowIndex(index);
  };

  const showPetForm = () => {
    setDisplayPetForm('block');
  };

  const hidePetForm = () => {
    setDisplayPetForm("none");
  };

  const showContactsForm = () => {
    setDisplayContactsForm("block");
  };

  const hideContactsForm = () => {
    setDisplayContactsForm("none");
  };

  const showHelpOptionForm = () => {
    setDisplayHelpOptionForm("block");
  };

  const hideHelpOptionForm = () => {
    setDisplayHelpOptionForm("none");
  };

  const showSettingsForm = () => {
    setDisplaySettingForm("block");
  };

  const hideSettingsForm = () => {
    setDisplaySettingForm("none");
  };

  const showDeleteMessage = () => {
    setDisplayDeleteMessage("block");
  };

  const hideDeleteMessage = () => {
    setDisplayDeleteMessage("none");
  };


  const showAdminForm = () => {
    setDisplayAdminForm('block');
  }

  const hideAdminForm = () => {
    setDisplayAdminForm('none');
  };



const handleLogout = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const getAdmin = () => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
        return; 
    }
    
    const decodedToken: IDecodedToken = jwtDecode(accessToken);

    setCurrentAdmin(decodedToken);
}

useEffect(() => {
    getAdmin(); 
}, []);

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

  const toggleSettingsList = () => {
    setSettingsListIsOpen(!settingsListIsOpen);
  };

  const togglePopUp = () => {
    setPopupIsOpen(!popupIsOpen);
  };


  const openForm = () => {
    if (
      activeButton !== null &&
      currentAdmin?.role === 'super-admin' &&
      activeButton !== "" &&
      activeButton.charAt(0) === "p"
    ) {
      showPetForm();
    } else if (
      activeButton !== null &&
      currentAdmin?.role === 'super-admin' &&
      activeButton !== "" &&
      activeButton === "contacts"
    ) {
      showContactsForm();
    } else if (
      activeButton !== null &&
      currentAdmin?.role === 'super-admin' &&
      activeButton !== "" &&
      activeButton === "settings"
    ) {
      showSettingsForm();
    } else if (
      activeButton !== null &&
      currentAdmin?.role === 'super-admin' &&
      activeButton !== "" &&
      activeButton === "help"
    ) {
      showHelpOptionForm();
    } else if (activeButton !== null && currentAdmin?.role === 'super-admin' && activeButton !== '' && activeButton === 'admins') {
      showAdminForm();
    } else {
      return;
    }
  };
  return (
    <div className="admin-page">
      <div className="admin-page__container">
        <DeleteMessage
          selectedPetRowIndex={selectedPetsRowIndex}
          selectedContactsRowIndex={selectedContactsRowIndex}
          selectedHelpRowIndex={selectedHelpRowIndex}
          selectedSettingsRowIndex={selectedSettingsRowIndex}
          display={displayDeleteMessage}
          hideMessage={hideDeleteMessage}
          pets={pets}
          contacts={contacts}
          settings={settings}
          helpOptions={helpOptions}
          activeButton={activeButton}
          setPetTableUpdate={setPetTableUpdate}
          setContactsTableUpdate={setContactsTableUpdate}
          setSettingsTableUpdate={setSettingsTableUpdate}
          setHelpOptionsTableUpdate={setHelpOptionsTableUpdate} 
          selectedAdminsRowIndex={selectedAdminsRowIndex} 
          admins={admins} 
          setAdminTableUpdate={setAdminTableUpdate}        
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

        <SettingsForm
          display={displaySettingForm}
          hideForm={hideSettingsForm}
          setSettingsTableUpdate={setSettingsTableUpdate}
          isEditBtnClicked={isEditBtnClicked}
          selectedSettingsRowIndex={selectedSettingsRowIndex}
          settings={settings}
          setIsEditBtnClicked={setIsEditBtnClicked}
        />

        <div className="sidebar">
          <div className="sidebar__container">
            <div className="sidebar-top__container">
              <img
                src={Logo}
                alt="zoonadiya-logo"
                className="sidebar-top__logo"
              />

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

                        <button
                          className="sidebar-option__dropdown-btn"
                          onClick={togglePetList}
                        >
                          <FontAwesomeIcon
                            icon={petListIsOpen ? faChevronUp : faChevronDown}
                          />
                        </button>
                      </div>

                      <div
                        className="sidebar-option-list"
                        style={{ display: petListIsOpen ? "block" : "none" }}
                      >
                        <ul className="sidebar-option-list__container">
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "p pets" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("p pets")}
                            >
                              всі тварини
                            </button>
                          </li>
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "p cats" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("p cats")}
                            >
                              коти
                            </button>
                          </li>
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "p dogs" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("p dogs")}
                            >
                              песики
                            </button>
                          </li>
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "p treatment" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("p treatment")}
                            >
                              потребують лікування
                            </button>
                          </li>
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "p adopted" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("p adopted")}
                            >
                              отримали дім
                            </button>
                          </li>
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "p temporary" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("p temporary")}
                            >
                              на тимчасовому перетримані
                            </button>
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

                        <button
                          className="sidebar-option__dropdown-btn"
                          onClick={toggleContactsList}
                        >
                          <FontAwesomeIcon
                            icon={
                              contactsListIsOpen ? faChevronUp : faChevronDown
                            }
                          />
                        </button>
                      </div>

                      <div
                        className="sidebar-option-list"
                        style={{
                          display: contactsListIsOpen ? "block" : "none",
                        }}
                      >
                        <ul className="sidebar-option-list__container">
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "contacts" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("contacts")}
                            >
                              всі контакти
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="sidebar-option">
                      <div className="sidebar-option__container">
                        <div className="sidebar-option__logo">
                          <FontAwesomeIcon icon={faHandshakeAngle} />
                        </div>

                        <p className="sidebar-option__title">
                          варіанти допомоги
                        </p>

                        <button
                          className="sidebar-option__dropdown-btn"
                          onClick={toggleHelpList}
                        >
                          <FontAwesomeIcon
                            icon={helpListIsOpen ? faChevronUp : faChevronDown}
                          />
                        </button>
                      </div>

                      <div
                        className="sidebar-option-list"
                        style={{ display: helpListIsOpen ? "block" : "none" }}
                      >
                        <ul className="sidebar-option-list__container">
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "help" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("help")}
                            >
                              всі варіанти допомоги
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="sidebar-option">
                      <div className="sidebar-option__container">
                        <div className="sidebar-option__logo">
                          <FontAwesomeIcon icon={faHandshakeAngle} />
                        </div>

                        <p className="sidebar-option__title">налаштування</p>

                        <button
                          className="sidebar-option__dropdown-btn"
                          onClick={toggleSettingsList}
                        >
                          <FontAwesomeIcon
                            icon={
                              settingsListIsOpen ? faChevronUp : faChevronDown
                            }
                          />
                        </button>
                      </div>

                      <div
                        className="sidebar-option-list"
                        style={{
                          display: settingsListIsOpen ? "block" : "none",
                        }}
                      >
                        <ul className="sidebar-option-list__container">
                          <li className="sidebar-option-list__option">
                            <button
                              className={`sidebar-option-list__option-button ${
                                activeButton === "settings" ? "active" : ""
                              }`}
                              onClick={() => toggleButton("settings")}
                            >
                              всі налаштування
                            </button>
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

                        <p className="sidebar-user-info__name">
                          Регіна Тодоренко
                        </p>
                      </div>

                      <div className="sidebar-user-menu">
                        <div className="sidebar-user-menu__container">
                          <button
                            onClick={togglePopUp}
                            className="sidebar-user-menu__btn"
                          >
                            <span></span>
                            <span></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="sidebar-user-popup"
                      style={{ display: popupIsOpen ? "block" : "none" }}
                    >
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
                    selectedSettingsRowIndex={selectedSettingsRowIndex}
                    setSelectedSettingsRowIndex={setSelectedSettingsRowIndex}
                    selectedHelpRowIndex={selectedHelpRowIndex}
                    setSelectedHelpRowIndex={setSelectedHelpRowIndex}
                    activeButton={activeButton}
                    showPetForm={showPetForm}
                    showContactsForm={showContactsForm}
                    showSettingsForm={showSettingsForm}
                    showHelpOptionForm={showHelpOptionForm}
                    setIsEditBtnClicked={setIsEditBtnClicked} selectedAdminsRowIndex={null} setSelectedAdminsRowIndex={function (value: SetStateAction<number | null>): void {
                      throw new Error("Function not implemented.");
                    } } showAdminForm={function (): void {
                      throw new Error("Function not implemented.");
                    } } adminRole={""}                />

                <DeleteBtn
                    selectedPetRowIndex={selectedPetsRowIndex}
                    setSelectedPetsRowIndex={setSelectedPetsRowIndex}
                    selectedContactsRowIndex={selectedContactsRowIndex}
                    setSelectedContactsRowIndex={setSelectedContactsRowIndex}
                    selectedSettingsRowIndex={selectedSettingsRowIndex}
                    setSelectedSettingsRowIndex={setSelectedSettingsRowIndex}
                    selectedHelpRowIndex={selectedHelpRowIndex}
                    setSelectedHelpRowIndex={setSelectedHelpRowIndex}
                    showMessage={showDeleteMessage}
                    activeButton={activeButton} selectedAdminsRowIndex={null} setSelectedAdminsRowIndex={function (value: SetStateAction<number | null>): void {
                      throw new Error("Function not implemented.");
                    } } adminRole={""}                />

                <button className="actions__add-btn" onClick={openForm}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="actions__add-btn-logo"
                  />

                  <p>додати</p>
                </button>
              </div>
            </div>

            <div className="main-content">
              <div className="main-content__container">
                {activeButton === "p pets" && (
                  <PetTable
                    activeButton={activeButton}
                    selectedRowIndex={selectedPetsRowIndex}
                    handleRowClick={handlePetRowClick}
                    pets={pets}
                    setPets={setPets}
                    petTableUpdate={petTableUpdate}
                  />
                )}
                {activeButton === "p cats" && (
                  <PetTable
                    activeButton={activeButton}
                    selectedRowIndex={selectedPetsRowIndex}
                    handleRowClick={handlePetRowClick}
                    pets={pets}
                    setPets={setPets}
                    petTableUpdate={petTableUpdate}
                  />
                )}
                {activeButton === "p dogs" && (
                  <PetTable
                    activeButton={activeButton}
                    selectedRowIndex={selectedPetsRowIndex}
                    handleRowClick={handlePetRowClick}
                    pets={pets}
                    setPets={setPets}
                    petTableUpdate={petTableUpdate}
                  />
                )}
                {activeButton === "p treatment" && (
                  <PetTable
                    activeButton={activeButton}
                    selectedRowIndex={selectedPetsRowIndex}
                    handleRowClick={handlePetRowClick}
                    pets={pets}
                    setPets={setPets}
                    petTableUpdate={petTableUpdate}
                  />
                )}
                {activeButton === "p adopted" && (
                  <PetTable
                    activeButton={activeButton}
                    selectedRowIndex={selectedPetsRowIndex}
                    handleRowClick={handlePetRowClick}
                    pets={pets}
                    setPets={setPets}
                    petTableUpdate={petTableUpdate}
                  />
                )}
                {activeButton === "p temporary" && (
                  <PetTable
                    activeButton={activeButton}
                    selectedRowIndex={selectedPetsRowIndex}
                    handleRowClick={handlePetRowClick}
                    pets={pets}
                    setPets={setPets}
                    petTableUpdate={petTableUpdate}
                  />
                )}

                {activeButton === "contacts" && (
                  <ContactsTable
                    selectedRowIndex={selectedContactsRowIndex}
                    handleRowClick={handleContactRowClick}
                    contacts={contacts}
                    setContacts={setContacts}
                    contactsTableUpdate={contactsTableUpdate}
                  />
                )}

                {activeButton === "help" && (
                  <HelpOptionsTable
                    selectedRowIndex={selectedHelpRowIndex}
                    handleRowClick={handleHelpRowClick}
                    helpOptions={helpOptions}
                    setHelpOptions={setHelpOptions}
                    helpOptionsTableUpdate={helpOptionsTableUpdate}
                  />
                )}

                {activeButton === "settings" && (
                  <SettingsTable
                    selectedRowIndex={selectedSettingsRowIndex}
                    handleRowClick={handleSettingRowClick}
                    settings={settings}
                    setSettings={setSettings}
                    settingsTableUpdate={settingsTableUpdate}
                  />
                )}

                {activeButton === null && (
                  <div className="main-content__greeting">
                    <p className="greeting__title">Вітаємо!</p>
                    <p className="greeting__caption">
                      оберіть категорію, щоб побачити інформацію і мати змогу
                      додати нову
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
