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
    activeButton: string | null;
    showHelpOptionForm: () => void;
    showPetForm: () => void;
    showContactsForm: () => void;
    setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditBtn = ({ selectedPetRowIndex, setSelectedPetsRowIndex, selectedContactsRowIndex, setSelectedContactsRowIndex, selectedHelpRowIndex, setSelectedHelpRowIndex, activeButton, showPetForm, showContactsForm, showHelpOptionForm, setIsEditBtnClicked }: IEditBtnProps) => {
    const display = selectedPetRowIndex !== null || selectedContactsRowIndex !== null || selectedHelpRowIndex !== null;

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
        }
    }

    const handleButtonClick = () => {

        if (selectedPetRowIndex !== null) {
            setSelectedContactsRowIndex(null);
            setSelectedHelpRowIndex(null);
        }

        if (selectedContactsRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedHelpRowIndex(null);
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
        setSelectedHelpRowIndex(null);
    }, [activeButton]);
    
    return (
        <abbr title="редагувати">
            <button className="actions__edit-btn" onClick={handleButtonClick} style={{ display: display ? 'block' : 'none' }}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </abbr>
    )
}