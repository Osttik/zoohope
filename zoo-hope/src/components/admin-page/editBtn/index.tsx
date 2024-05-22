import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface IEditBtnProps {
  selectedSettingsRowIndex: null | number;
  setSelectedSettingsRowIndex: any;
  showSettingsForm: () => void;
  selectedPetRowIndex: null | number;
  setSelectedPetsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
  selectedContactsRowIndex: null | number;
  setSelectedContactsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
  selectedHelpRowIndex: null | number;
  setSelectedHelpRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
  selectedAdminsRowIndex: null | number;
  setSelectedAdminsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
  selectedHelpfulInfoRowIndex: null | number;
  setSelectedHelpfulInfoRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
  activeButton: string | null;
  showHelpOptionForm: () => void;
  showPetForm: () => void;
  showContactsForm: () => void;
  showAdminForm: () => void;
  showHelpfulInfoForm: () => void;
  setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  adminRole: string;
}

export const EditBtn = ({
  selectedPetRowIndex,
  setSelectedPetsRowIndex,
  selectedContactsRowIndex,
  setSelectedContactsRowIndex,
  selectedSettingsRowIndex,
  setSelectedSettingsRowIndex,
  selectedHelpRowIndex,
  selectedAdminsRowIndex,
  adminRole,
  setSelectedAdminsRowIndex,
  setSelectedHelpRowIndex,
  activeButton,
  showPetForm,
  showContactsForm,
  showSettingsForm,
  showHelpOptionForm,
  setIsEditBtnClicked,
  showAdminForm,
    selectedHelpfulInfoRowIndex,
    setSelectedHelpfulInfoRowIndex,
    showHelpfulInfoForm,
}: IEditBtnProps) => {
  const display =
    selectedPetRowIndex !== null ||
    selectedContactsRowIndex !== null ||
    selectedSettingsRowIndex !== null ||
    selectedHelpRowIndex !== null || 
    selectedAdminsRowIndex !== null;

  const handleButtonClick = () => {
    if (activeButton === null) {
      console.error("activeButton is null");
      return;
    }
    if (selectedPetRowIndex !== null) {
      setSelectedContactsRowIndex(null);
      setSelectedHelpRowIndex(null);
        switch (true) {
            case activeButton.charAt(0) === 'p':
                showPetForm();
                setIsEditBtnClicked(true);
                break;
            case activeButton === 'contacts':
                showContactsForm();
                setIsEditBtnClicked(true);
                break;
            case activeButton === "settings":
                showSettingsForm();
                setIsEditBtnClicked(true);
                break;
            case activeButton === 'help':
                showHelpOptionForm();
                setIsEditBtnClicked(true);
                break;
            case activeButton === 'info':
                showHelpfulInfoForm();
                setIsEditBtnClicked(true);
                break;
            case activeButton === 'admins':
                showAdminForm();
                setIsEditBtnClicked(true);
                break;
        }
    }
}

    /*const handleButtonClick = () => {
        if (selectedPetRowIndex !== null) {
            setSelectedContactsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
        }

        if (selectedContactsRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
        }

        if (selectedHelpRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
        }

        if (selectedHelpfulInfoRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpRowIndex(null);
        }

        if (selectedAdminsRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
        }
    }*/

    useEffect(() => {
        setSelectedPetsRowIndex(null);
        setSelectedContactsRowIndex(null);
        setSelectedSettingsRowIndex(null);
        setSelectedHelpRowIndex(null);
        setSelectedAdminsRowIndex(null);
        setSelectedHelpfulInfoRowIndex(null);
    }, [activeButton]);

    return (
        <abbr title="редагувати">
            <button className="actions__edit-btn" onClick={handleButtonClick} style={{ display: display && (activeButton !== 'admins' || adminRole === 'super-admin') ? 'block' : 'none' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </abbr>
    )
}
