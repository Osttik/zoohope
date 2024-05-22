import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface IDeleteBtnProps {
    selectedPetRowIndex: null | number;
    setSelectedPetsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
    selectedContactsRowIndex: null | number;
    selectedSettingsRowIndex: null | number;
    setSelectedSettingsRowIndex: any;
    setSelectedContactsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
    selectedHelpRowIndex: null | number;
    setSelectedHelpRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
    selectedAdminsRowIndex: null | number;
    setSelectedAdminsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
    selectedHelpfulInfoRowIndex: null | number;
    setSelectedHelpfulInfoRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
    showMessage: () => void;
    activeButton: string | null;
    adminRole: string;
}

export const DeleteBtn = ({ 
    selectedPetRowIndex, 
    setSelectedPetsRowIndex, 
    selectedContactsRowIndex, 
    setSelectedContactsRowIndex, 
    selectedSettingsRowIndex,
    setSelectedSettingsRowIndex,
    selectedHelpRowIndex, 
    setSelectedHelpRowIndex, 
    selectedAdminsRowIndex, 
    setSelectedAdminsRowIndex, 
    showMessage, 
    activeButton, 
    adminRole,
    selectedHelpfulInfoRowIndex,
    setSelectedHelpfulInfoRowIndex,
}: IDeleteBtnProps) => {
    const display = selectedPetRowIndex !== null || 
    selectedContactsRowIndex !== null || 
    selectedHelpRowIndex !== null ||
    selectedSettingsRowIndex !== null ||
    selectedAdminsRowIndex !== null;

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

        if (selectedSettingsRowIndex !== null) {
            setSelectedSettingsRowIndex(null);
            setSelectedContactsRowIndex(null);
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

        showMessage();
    };

    useEffect(() => {
        setSelectedPetsRowIndex(null);
        setSelectedContactsRowIndex(null);
        setSelectedSettingsRowIndex(null)
        setSelectedHelpRowIndex(null);
        setSelectedAdminsRowIndex(null);
        setSelectedHelpfulInfoRowIndex(null);
    }, [activeButton]);
    return (
        <abbr title="видалити" >
            <button className="actions__delete-btn" onClick={handleButtonClick} style={{ display: display && (activeButton !== 'admins' || adminRole === 'super-admin') ? 'block' : 'none' }}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </abbr>
    )
}