import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface IDeleteBtnProps {
    selectedPetRowIndex: null | number;
    setSelectedPetsRowIndex: any;
    selectedContactsRowIndex: null | number;
    setSelectedContactsRowIndex: any;
    selectedHelpRowIndex: null | number;
    setSelectedHelpRowIndex: any;
    showMessage: () => void;
    activeButton: string | null;
}

export const DeleteBtn = ({ selectedPetRowIndex, setSelectedPetsRowIndex, selectedContactsRowIndex, setSelectedContactsRowIndex, selectedHelpRowIndex, setSelectedHelpRowIndex, showMessage, activeButton }: IDeleteBtnProps) => {
    const display = selectedPetRowIndex !== null || selectedContactsRowIndex !== null || selectedHelpRowIndex !== null;

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

        showMessage(); 
    };

    useEffect(() => {
        setSelectedPetsRowIndex(null);
        setSelectedContactsRowIndex(null);
        setSelectedHelpRowIndex(null);
    }, [activeButton]);
    return (
        <abbr title="видалити" >
            <button className="actions__delete-btn" onClick={handleButtonClick} style={{ display: display ? 'block' : 'none' }}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </abbr>
    )
}