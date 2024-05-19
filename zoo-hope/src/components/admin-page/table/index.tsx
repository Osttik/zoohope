import { useEffect, useState } from "react";
import { IPet } from "../../../define";
import { IContact } from "../../../define";
import { IHelpOption } from "../../../define";
import { IAdmin } from "../../../define";
import { getAllPets, getCats, getDogs, getNeedTreatmentPet, getAdoptedPets, getTimeAdoptedPets } from "../../../api/pets";
import { getAllContacts } from "../../../api/contacts";
import { apiGetAllHelpOptions } from "../../../api/helpOptions";
import { getAllAdmins } from "../../../api/admins";
import { IHelpfulInfo } from "../../../define";
import { getAllHelpfulInfo } from "../../../api/helpfulInfo";

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
    helpfulInfo: IHelpfulInfo[];
    setHelpfulInfo: React.Dispatch<React.SetStateAction<IHelpfulInfo[]>>;
    selectedPetsRowIndex: null | number;
    handlePetRowClick: (index: number) => void;
    selectedContactsRowIndex: null | number;
    handleContactRowClick: (index: number) => void;
    selectedHelpRowIndex: null | number;
    handleHelpRowClick: (index: number) => void;
    selectedAdminsRowIndex: null | number;
    handleAdminRowClick: (index: number) => void;
    selectedHelpfulInfoRowIndex: null | number;
    handleHelpfulInfoRowClick: (index: number) => void;
    petTableUpdate: boolean;
    contactsTableUpdate: boolean;
    helpOptionsTableUpdate: boolean;
    adminTableUpdate: boolean;
    helpfulInfoTableUpdate: boolean;
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
    helpfulInfo,
    setHelpfulInfo,
    selectedPetsRowIndex,
    handlePetRowClick,
    selectedContactsRowIndex,
    handleContactRowClick,
    selectedHelpRowIndex,
    handleHelpRowClick,
    selectedAdminsRowIndex,
    handleAdminRowClick,
    selectedHelpfulInfoRowIndex,
    handleHelpfulInfoRowClick,
    petTableUpdate,
    contactsTableUpdate,
    helpOptionsTableUpdate,
    adminTableUpdate,
    helpfulInfoTableUpdate }: ITableProps) => {

    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const petHeadings = [
        "№", "Ім'я", "Тип", "Стать", "Вік(місяців)", "Порода",
        "Розмір(см)", "Забарвлення", "Характер", "Стерилізація",
        "Лікування", "id"
    ];

    const contactHeadings = ["№", "Назва", "Посилання", "id"];

    const helpOptionsHeadings = ["№", "Назва", "Опис", "id"];

    const helpfulInfoHeadings = ["№", "Питання", "Інформація", "id"];

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

    const sortListByName = (list: any[], nameGetter: (item: any) => string) => {
        const sortedList = [...list];
        sortedList.sort((a, b) => {
            const nameA = nameGetter(a);
            const nameB = nameGetter(b);

            if (nameA < nameB) {
                return sortDirection === 'asc' ? -1 : 1;
            }

            if (nameA > nameB) {
                return sortDirection === 'asc' ? 1 : -1;
            }

            return 0;
        });
        return sortedList;
    };

    const sortByName = (columnIndex: number) => {
        if (activeButton === null) {
            console.error('activeButton is null');
            return;
        }

        let sortedList = [];

        switch (true) {
            case activeButton.charAt(0) === 'p':
                if (columnIndex === 1) {
                    sortedList = sortListByName(pets, (item) => item.name && item.name.ua ? item.name.ua : '');
                    setPets(sortedList);
                }
                break;
            case activeButton === 'contacts':
                if (columnIndex === 1) {
                    sortedList = sortListByName(contacts, (item) => item.name && item.name.ua ? item.name.ua : '');
                    setContacts(sortedList);
                }
                break;
            case activeButton === 'help':
                if (columnIndex === 1) {
                    sortedList = sortListByName(helpOptions, (item) => item.name && item.name.ua ? item.name.ua : '');
                    setHelpOptions(sortedList);
                }
                break;
            case activeButton === 'info':
                if (columnIndex === 1) {
                    sortedList = sortListByName(helpfulInfo, (item) => item.question && item.question.ua ? item.question.ua : '');
                    setHelpfulInfo(sortedList);
                }
                break;
            case activeButton === 'admins':
                if (columnIndex === 1) {
                    sortedList = sortListByName(admins, (item) => item.name ? item.name : '');
                    setAdmins(sortedList);
                }
                break;
            default:
                break;
        }

        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
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
            case 'info':
                getAllHelpfulInfo().then(setHelpfulInfo);
                break;
            case 'admins':
                getAllAdmins().then(setAdmins);
                break;
            default:
                break;
        }
    }, [activeButton, petTableUpdate, contactsTableUpdate, helpOptionsTableUpdate, adminTableUpdate, helpfulInfoTableUpdate]);

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
            ) : helpfulInfo.length > 0 && activeButton === 'info' ? (
                <table className="admin-table">
                    <thead>
                        <tr className="admin-table__row">
                            {helpfulInfoHeadings.map((heading, index) => (
                                <th onClick={() => sortByName(index)} key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {helpfulInfo.map((option: IHelpfulInfo, index: number) => (
                            <tr key={option._id} className={`admin-table__row ${selectedHelpfulInfoRowIndex === index ? 'focus' : ''}`} onClick={() => handleHelpfulInfoRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{option.question && option.question.ua}</td>
                                <td>{option.information && option.information.ua}</td>
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