import axios from "axios";
import { useState, useEffect } from "react";

interface IContactsTableProps {
    url: string;
    activeButton: string;
    selectedRowIndex: null | number;
    handleRowClick: (index: number) => void;
}

interface IContactsTable {
    name: string;
    url: string;
    icon: string;
    _id: string;
}

export const ContactsTable = ({ url, activeButton, selectedRowIndex, handleRowClick  }: IContactsTableProps) => {
    const [contacts, setContacts] = useState<IContactsTable[]>([]);

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
    }, [url]);

    console.log(contacts);
    return (
        <div className="contacts-table-container">
            {contacts.length > 0 ? (
                <table className="contacts-table">
                    <thead>
                        <tr className="contacts-table__row">
                            <th>№</th>
                            <th>Назва</th>
                            <th>Посилання</th>
                            <th>Зображення</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact: any, index: number) => (
                            <tr key={index} className={`pet-table__row ${selectedRowIndex === index ? 'focus' : ''}`} onClick={() => handleRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{contact.name}</td>
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