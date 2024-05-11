import { useEffect, useState } from "react";
import { IPet } from "../../../define";
import { IContact } from "../../../define";
import { IHelpOption } from "../../../define";
import { IAdmin } from "../../../define";
import { getAllPets, getCats, getDogs, getNeedTreatmentPet, getAdoptedPets, getTimeAdoptedPets } from "../../../api/pets";
import { getAllContacts } from "../../../api/contacts";
import { apiGetAllHelpOptions } from "../../../api/helpOptions";
import { getAllAdmins } from "../../../api/admins";

interface ITableProps {
    activeButton: string;
    pets: IPet[];
    setPets: React.Dispatch<React.SetStateAction<IPet[]>>;
    contacts: IContact[];
    setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
    helpOptions: IHelpOption[];
    setHelpOptions: React.Dispatch<React.SetStateAction<IHelpOption[]>>;
    admins: IAdmin[];
    setAdmins: React.Dispatch<React.SetStateAction<IAdmin[]>>;
    selectedPetsRowIndex: null | number;
    handlePetRowClick: (index: number) => void;
    selectedContactsRowIndex: null | number;
    handleContactRowClick: (index: number) => void;
    selectedHelpRowIndex: null | number;
    handleHelpRowClick: (index: number) => void;
    selectedAdminsRowIndex: null | number;
    handleAdminRowClick: (index: number) => void;
    petTableUpdate: boolean;
    contactsTableUpdate: boolean;
    helpOptionsTableUpdate: boolean;
    adminTableUpdate: boolean;
}

export const Table = ({
    activeButton,
    pets,
    setPets,
    contacts,
    setContacts,
    helpOptions,
    setHelpOptions,
    admins,
    setAdmins,
    selectedPetsRowIndex,
    handlePetRowClick,
    selectedContactsRowIndex,
    handleContactRowClick,
    selectedHelpRowIndex,
    handleHelpRowClick,
    selectedAdminsRowIndex,
    handleAdminRowClick,
    petTableUpdate,
    contactsTableUpdate,
    helpOptionsTableUpdate,
    adminTableUpdate }: ITableProps) => {

    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const petHeadings = [
        "№", "Ім'я", "Тип", "Стать", "Вік(місяців)", "Порода",
        "Розмір(см)", "Забарвлення", "Характер", "Стерилізація",
        "Лікування", "id"
    ];

    const contactHeadings = ["№", "Назва", "Посилання", "id"];

    const helpOptionsHeadings = ["№", "Назва", "Опис", "id"];

    const adminsHeadings = ["№", "Ім'я", "Email", "Роль"];

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

    const sortByName = (columnIndex: number) => {
        if (activeButton === null) {
            console.error('activeButton is null');
        }
        switch (true) {
            case activeButton.charAt(0) === 'p':
                if (columnIndex === 1) {
                    const sortedPets = [...pets];
                    sortedPets.sort((a, b) => {
                        const nameA = a.name && a.name.ua ? a.name.ua : '';
                        const nameB = b.name && b.name.ua ? b.name.ua : '';

                        if (nameA < nameB) {
                            return sortDirection === 'asc' ? -1 : 1;
                        }

                        if (nameA > nameB) {
                            return sortDirection === 'asc' ? 1 : -1;
                        }
                        return 0;
                    });
                    setPets(sortedPets);
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }
                break;
            case activeButton === 'contacts':
                if (columnIndex === 1) {
                    const sortedContacts = [...contacts];
                    sortedContacts.sort((a, b) => {
                        const nameA = a.name && a.name.ua ? a.name.ua : '';
                        const nameB = b.name && b.name.ua ? b.name.ua : '';

                        if (nameA < nameB) {
                            return sortDirection === 'asc' ? -1 : 1;
                        }

                        if (nameA > nameB) {
                            return sortDirection === 'asc' ? 1 : -1;
                        }
                        return 0;
                    });
                    setContacts(sortedContacts);
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }
                break;
            case activeButton === 'help':
                if (columnIndex === 1) {
                    const sortedHelpOptions = [...helpOptions];
                    sortedHelpOptions.sort((a, b) => {
                        const nameA = a.name && a.name.ua ? a.name.ua : '';
                        const nameB = b.name && b.name.ua ? b.name.ua : '';

                        if (nameA < nameB) {
                            return sortDirection === 'asc' ? -1 : 1;
                        }

                        if (nameA > nameB) {
                            return sortDirection === 'asc' ? 1 : -1;
                        }
                        return 0;
                    });
                    setHelpOptions(sortedHelpOptions);
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }
                break;
            case activeButton === 'admins':
                if (columnIndex === 1) {
                    const sortedAdmins = [...admins];
                    sortedAdmins.sort((a, b) => {
                        const nameA = a.name ? a.name : '';
                        const nameB = b.name ? b.name : '';

                        if (nameA < nameB) {
                            return sortDirection === 'asc' ? -1 : 1;
                        }

                        if (nameA > nameB) {
                            return sortDirection === 'asc' ? 1 : -1;
                        }
                        return 0;
                    });
                    setAdmins(sortedAdmins);
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }
                break;
        }
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
                getAdoptedPets().then(setPets);
                break;
            case 'p temporary':
                getTimeAdoptedPets().then(setPets);
                break;
            case 'contacts':
                getAllContacts().then(setContacts);
                break;
            case 'help':
                apiGetAllHelpOptions().then(setHelpOptions);
                break;
            case 'admins':
                getAllAdmins().then(setAdmins);
                console.log(admins);

                break;
        }
    }, [activeButton, petTableUpdate, contactsTableUpdate, helpOptionsTableUpdate, adminTableUpdate]);

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
                                <th onClick={() => sortByName(index)} key={index}>{heading}</th>
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
                                <th onClick={() => sortByName(index)} key={index}>{heading}</th>
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
                                <th onClick={() => sortByName(index)} key={index}>{heading}</th>
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
            ) : admins.length > 0 && activeButton === 'admins' ? (
                <table className="admin-table">
                    <thead>
                        <tr className="admin-table__row">
                            {adminsHeadings.map((heading, index) => (
                                <th onClick={() => sortByName(index)} key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((option: IAdmin, index: number) => (
                            <tr key={option._id} className={`admin-table__row ${selectedAdminsRowIndex === index ? 'focus' : ''}`} onClick={() => handleAdminRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{option.name}</td>
                                <td>{option.email}</td>
                                <td>{option.role}</td>
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