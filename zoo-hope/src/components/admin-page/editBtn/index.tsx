import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface IEditBtnProps {
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
    selectedHelpRowIndex,
    setSelectedHelpRowIndex,
    selectedAdminsRowIndex,
    setSelectedAdminsRowIndex,
    selectedHelpfulInfoRowIndex,
    setSelectedHelpfulInfoRowIndex,
    activeButton,
    showPetForm,
    showContactsForm,
    showHelpOptionForm,
    showAdminForm,
    showHelpfulInfoForm,
    setIsEditBtnClicked,
    adminRole }: IEditBtnProps) => {

    const display = selectedPetRowIndex !== null ||
        selectedContactsRowIndex !== null ||
        selectedHelpRowIndex !== null ||
        selectedAdminsRowIndex !== null ||
        selectedHelpfulInfoRowIndex !== null;

    const showEditForm = () => {
        if (activeButton === null) {
            console.error('activeButton is null');
            return;
        }

        switch (true) {
            case activeButton.charAt(0) === 'p':
                showPetForm();
                setIsEditBtnClicked(true);
                break;
            case activeButton === 'contacts':
                showContactsForm();
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

    const handleButtonClick = () => {
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

        showEditForm();
    };

    useEffect(() => {
        setSelectedPetsRowIndex(null);
        setSelectedContactsRowIndex(null);
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