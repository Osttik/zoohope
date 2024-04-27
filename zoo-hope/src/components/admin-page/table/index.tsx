import { useEffect } from "react";
import { IPet } from "../../../define";
import { IContact } from "../../../define";
import { IHelpOption } from "../../../define";
import { getAllPets, getCats, getDogs, getNeedTreatmentPet } from "../../../api/pets";
import { getAllContacts } from "../../../api/contacts";
import { apiGetAllHelpOptions } from "../../../api/helpOptions";

interface ITableProps {
    activeButton: string;
    pets: IPet[];
    setPets: React.Dispatch<React.SetStateAction<IPet[]>>;
    contacts: IContact[];
    setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
    helpOptions: IHelpOption[];
    setHelpOptions: React.Dispatch<React.SetStateAction<IHelpOption[]>>;
    selectedPetsRowIndex: null | number;
    handlePetRowClick: (index: number) => void;
    selectedContactsRowIndex: null | number;
    handleContactRowClick: (index: number) => void;
    selectedHelpRowIndex: null | number;
    handleHelpRowClick: (index: number) => void;
    petTableUpdate: boolean;
    contactsTableUpdate: boolean;
    helpOptionsTableUpdate: boolean;
}

export const Table = ({
    activeButton,
    pets,
    setPets,
    contacts,
    setContacts,
    helpOptions,
    setHelpOptions,
    selectedPetsRowIndex,
    handlePetRowClick,
    selectedContactsRowIndex,
    handleContactRowClick,
    selectedHelpRowIndex,
    handleHelpRowClick,
    petTableUpdate,
    contactsTableUpdate,
    helpOptionsTableUpdate }: ITableProps) => {

    const petHeadings = [
        "№", "Ім'я", "Тип", "Стать", "Вік(місяців)", "Порода",
        "Розмір(см)", "Забарвлення", "Характер", "Стерилізація",
        "Лікування", "id"
    ];

    const contactHeadings = ["№", "Назва", "Посилання", "id"];

    const helpOptionsHeadings = ["№", "Назва", "Опис", "id"];

    //code for horizontal scroll of table cells
    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;

        if (target.tagName === 'TD') {
            target.scrollLeft += event.deltaY;
        }
    };

    const handleWheelWrapper = (event: Event) => {
        const wheelEvent = event as WheelEvent;
        handleWheel(wheelEvent);
    };

    useEffect(() => {
        switch (activeButton) {
            case 'p pets':
                getAllPets().then(setPets);
                break;
            case 'p cats':
                getCats().then(setPets);
                break;
            case 'p dogs':
                getDogs().then(setPets);
                break;
            case 'p treatment':
                getNeedTreatmentPet().then(setPets);
                break;
            case 'p adopted':
                setPets([]);
                break;
            case 'p temporary':
                setPets([]);
                break;
            case 'contacts':
                getAllContacts().then(setContacts);
                break;
            case 'help':
                apiGetAllHelpOptions().then(setHelpOptions);
                break;
        }
    }, [activeButton, petTableUpdate, contactsTableUpdate, helpOptionsTableUpdate]);

    useEffect(() => {
        const tableBody = document.querySelector('.admin-table tbody');
        if (tableBody) {
            tableBody.addEventListener('wheel', handleWheelWrapper);
        }

        return () => {
            if (tableBody) {
                tableBody.removeEventListener('wheel', handleWheelWrapper);
            }
        };
    }, []);
    return (
        <div className="admin-table-container">
            {pets.length > 0 && activeButton.charAt(0) === 'p' ? (
                <table className="admin-table">
                    <thead>
                        <tr className="admin-table__row">
                            {petHeadings.map((heading, index) => (
                                <th key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet: IPet, index: number) => (
                            <tr key={index} className={`admin-table__row ${selectedPetsRowIndex === index ? 'focus' : ''}`} onClick={() => handlePetRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{pet.name && pet.name.ua}</td>
                                <td>{pet.type}</td>
                                <td>{pet.sex}</td>
                                <td>{pet.age}</td>
                                <td>{pet.breed && pet.breed.ua}</td>
                                <td>{pet.size}</td>
                                <td>{pet.color && pet.color.ua}</td>
                                <td>{pet.personality && pet.personality.ua}</td>
                                <td>{pet.sterilization}</td>
                                <td>{pet.treatment}</td>
                                <td>{pet._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : contacts.length > 0 && activeButton === 'contacts' ? (
                <table className="admin-table">
                    <thead>
                        <tr className="admin-table__row">
                            {contactHeadings.map((heading, index) => (
                                <th key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact: IContact, index: number) => (
                            <tr key={index} className={`admin-table__row ${selectedContactsRowIndex === index ? 'focus' : ''}`} onClick={() => handleContactRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{contact.name && contact.name.ua}</td>
                                <td>{contact.url}</td>
                                <td>{contact._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : helpOptions.length > 0 && activeButton === 'help' ? (
                <table className="admin-table">
                    <thead>
                        <tr className="admin-table__row">
                            {helpOptionsHeadings.map((heading, index) => (
                                <th key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {helpOptions.map((option: IHelpOption, index: number) => (
                            <tr key={option._id} className={`admin-table__row ${selectedHelpRowIndex === index ? 'focus' : ''}`} onClick={() => handleHelpRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{option.name && option.name.ua}</td>
                                <td>{option.description && option.description.ua}</td>
                                <td>{option._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="table-error-massage">Ви ще не додали жодного елемента</div>
            )}
        </div>
    )
}