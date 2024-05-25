import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface IDeleteBtnProps {
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
    selectedSettingsRowIndex: null | number;
    setSelectedSettingsRowIndex: React.Dispatch<React.SetStateAction<null | number>>;
    showMessage: () => void;
    activeButton: string | null;
    adminRole: string;
}
export const DeleteBtn = ({
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
    selectedSettingsRowIndex,
    setSelectedSettingsRowIndex,
    showMessage,
    activeButton,
    adminRole }: IDeleteBtnProps) => {

    const display = selectedPetRowIndex !== null ||
        selectedContactsRowIndex !== null ||
        selectedHelpRowIndex !== null ||
        selectedAdminsRowIndex !== null ||
        selectedHelpfulInfoRowIndex !== null || 
        selectedSettingsRowIndex !== null;

    const handleButtonClick = () => {
        if (selectedPetRowIndex !== null) {
            setSelectedContactsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
            setSelectedSettingsRowIndex(null);
        }

        if (selectedContactsRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
            setSelectedSettingsRowIndex(null);
        }

        if (selectedHelpRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
            setSelectedSettingsRowIndex(null);
        }

        if (selectedHelpfulInfoRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedAdminsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedSettingsRowIndex(null);
        }

        if (selectedAdminsRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
            setSelectedSettingsRowIndex(null);
        }

        if (selectedSettingsRowIndex !== null) {
            setSelectedPetsRowIndex(null);
            setSelectedContactsRowIndex(null);
            setSelectedHelpRowIndex(null);
            setSelectedHelpfulInfoRowIndex(null);
            setSelectedAdminsRowIndex(null);
        }

        showMessage();
    };

    useEffect(() => {
        setSelectedPetsRowIndex(null);
        setSelectedContactsRowIndex(null);
        setSelectedHelpRowIndex(null);
        setSelectedAdminsRowIndex(null);
        setSelectedHelpfulInfoRowIndex(null);
        setSelectedSettingsRowIndex(null);
    }, [activeButton]);
    return (
        <abbr title="видалити" >
            <button className="actions__delete-btn" onClick={handleButtonClick} style={{ display: display && (activeButton !== 'admins' && activeButton !== 'settings' || adminRole === 'super-admin') ? 'block' : 'none' }}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </abbr>
    )
}