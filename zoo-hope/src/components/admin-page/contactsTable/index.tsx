import axios from "axios";
import { useEffect, useState } from "react";

interface IContactsTableProps {
    selectedRowIndex: null | number;
    handleRowClick: (index: number) => void;
    contacts: IContactsTable[]
    setContacts: any;
    contactsTableUpdate: boolean;
}

interface IContactsTable {
    name: {
        ua: string;
        en: string
    };
    url: string;
    icon: string;
    _id: string;
}

export const ContactsTable = ({ selectedRowIndex, handleRowClick, contacts, setContacts, contactsTableUpdate }: IContactsTableProps) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const url = 'get-all-contacts';

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

    const sortByName = () => {
        const sortedContacts = [...contacts];

        const compareFunction = (a: IContactsTable, b: IContactsTable) => {
            const nameA = a.name && a.name.ua ? a.name.ua.toLowerCase() : '';
            const nameB = b.name && b.name.ua ? b.name.ua.toLowerCase() : '';

            let comparison = 0;
            
            if (nameA > nameB) {
                comparison = 1;

            } else if (nameA < nameB) {
                comparison = -1;
            }

            return comparison;
        };
    
        if (sortDirection === 'asc') {
            sortedContacts.sort(compareFunction);
            setSortDirection('desc');
        } else {
            sortedContacts.sort((a, b) => compareFunction(b, a));
            setSortDirection('asc'); 
        }
    
        setContacts(sortedContacts);
    };

    useEffect(() => {
        const getAllContacts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/${url}`);
                setContacts(response.data);

            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        getAllContacts();
    }, [url, contactsTableUpdate]);

    console.log(contacts);
    
    useEffect(() => {
        const tableBody = document.querySelector('.contacts-table tbody');
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
        <div className="contacts-table-container">
            {contacts.length > 0 ? (
                <table className="contacts-table">
                    <thead>
                        <tr className="contacts-table__row">
                            <th>№</th>
                            <th onClick={sortByName}>Назва</th>
                            <th>Посилання</th>
                            <th>Зображення</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact: IContactsTable, index: number) => (
                            <tr key={index} className={`pet-table__row ${selectedRowIndex === index ? 'focus' : ''}`} onClick={() => handleRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{contact.name && contact.name.ua}</td>
                                <td>{contact.url}</td>
                                <td>{contact.icon}</td>
                                <td>{contact._id}</td>
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