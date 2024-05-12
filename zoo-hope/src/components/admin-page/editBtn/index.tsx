import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface IEditBtnProps {
  selectedPetRowIndex: null | number;
  setSelectedPetsRowIndex: any;
  selectedContactsRowIndex: null | number;
  setSelectedContactsRowIndex: any;
  selectedSettingsRowIndex: null | number;
  setSelectedSettingsRowIndex: any;
  selectedHelpRowIndex: null | number;
  setSelectedHelpRowIndex: any;
  activeButton: string | null;
  showHelpOptionForm: () => void;
  showPetForm: () => void;
  showContactsForm: () => void;
  showSettingsForm: () => void;
  setIsEditBtnClicked: any;
}

export const EditBtn = ({
  selectedPetRowIndex,
  setSelectedPetsRowIndex,
  selectedContactsRowIndex,
  setSelectedContactsRowIndex,
  selectedSettingsRowIndex,
  setSelectedSettingsRowIndex,
  selectedHelpRowIndex,
  setSelectedHelpRowIndex,
  activeButton,
  showPetForm,
  showContactsForm,
  showSettingsForm,
  showHelpOptionForm,
  setIsEditBtnClicked,
}: IEditBtnProps) => {
  const display =
    selectedPetRowIndex !== null ||
    selectedContactsRowIndex !== null ||
    selectedSettingsRowIndex !== null ||
    selectedHelpRowIndex !== null;

  const showEditForm = () => {
    if (activeButton === null) {
      console.error("activeButton is null");
      return;
    }

    switch (true) {
      case activeButton.charAt(0) === "p":
        showPetForm();
        setIsEditBtnClicked(true);
        break;
      case activeButton === "contacts":
        showContactsForm();
        setIsEditBtnClicked(true);
        break;
      case activeButton === "settings":
        showSettingsForm();
        setIsEditBtnClicked(true);
        break;
      case activeButton === "help":
        showHelpOptionForm();
        setIsEditBtnClicked(true);
        break;
    }
  };

  const handleButtonClick = () => {
    if (selectedPetRowIndex !== null) {
      setSelectedContactsRowIndex(null);
      setSelectedHelpRowIndex(null);
    }

    if (selectedContactsRowIndex !== null) {
      setSelectedPetsRowIndex(null);
      setSelectedHelpRowIndex(null);
    }

    if (selectedContactsRowIndex !== null) {
      setSelectedSettingsRowIndex(null);
      setSelectedContactsRowIndex(null);
    }

    if (selectedHelpRowIndex !== null) {
      setSelectedPetsRowIndex(null);
      setSelectedContactsRowIndex(null);
    }

    showEditForm();
  };

  useEffect(() => {
    setSelectedPetsRowIndex(null);
    setSelectedContactsRowIndex(null);
    setSelectedSettingsRowIndex(null);
    setSelectedHelpRowIndex(null);
  }, [activeButton]);

  return (
    <abbr title="редагувати">
      <button
        className="actions__edit-btn"
        onClick={handleButtonClick}
        style={{ display: display ? "block" : "none" }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </abbr>
  );
};
