import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface IPetTableProps {
    activeButton: string;
    selectedRowIndex: null | number;
    handleRowClick: (index: number) => void;
    pets: IPetTable[];
    setPets: any;
    petTableUpdate: boolean;
}

interface IPetTable {
    name: {
        ua: string;
        en: string;
    };
    type: string;
    sex: string;
    age: string;
    breed: {
        ua: string;
        en: string;
    };
    size: string;
    color: {
        ua: string;
        en: string;
    };
    personality: {
        ua: string;
        en: string;
    };
    story: {
        ua: string;
        en: string;
    };
    image: string;
    sterilization: string;
    treatment: string;
    _id: string;
}

export const PetTable = ({ activeButton, selectedRowIndex, handleRowClick, pets, setPets, petTableUpdate }: IPetTableProps) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const url = 'get-all-pets';

    const headings = [
        "№", "Ім'я", "Тип", "Стать", "Вік(місяців)", "Порода",
        "Розмір(см)", "Забарвлення", "Характер", "Стерилізація",
        "Лікування", "id"
    ];

    const getAllPets = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`);
            setPets(response.data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const getCats = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`);
            const data = response.data
                .filter((pet: IPetTable) => pet.type === 'Кіт')
            setPets(data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const getDogs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`);
            const data = response.data
                .filter((pet: IPetTable) => pet.type === 'Пес')
            setPets(data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const getNeedTreatmentPet = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`);
            const data = response.data
                .filter((pet: IPetTable) => pet.treatment === 'Потребує')
            setPets(data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

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
        const sortedPets = [...pets];

        const compareFunction = (a: IPetTable, b: IPetTable) => {
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
            sortedPets.sort(compareFunction);
            setSortDirection('desc');
        } else {
            sortedPets.sort((a, b) => compareFunction(b, a));
            setSortDirection('asc');
        }

        setPets(sortedPets);
    };

    useEffect(() => {
        switch (activeButton) {
            case 'p pets':
                getAllPets();
                break;
            case 'p cats':
                getCats();
                break;
            case 'p dogs':
                getDogs();
                break;
            case 'p treatment':
                getNeedTreatmentPet();
                break;
            case 'p adopted':
                setPets([]);
                break;
            case 'p temporary':
                setPets([]);
                break;
        }
    }, [activeButton, petTableUpdate]);

    console.log(pets);

    useEffect(() => {
        const tableBody = document.querySelector('.pet-table tbody');
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
        <div className="pet-table-container">
            {pets.length > 0 ? (
                <table className="pet-table">
                    <thead>
                        <tr className="pet-table__row">
                            {headings.map((heading, index) => (
                                <th key={index} onClick={sortByName}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet: IPetTable, index: number) => (
                            <tr key={index} className={`pet-table__row ${selectedRowIndex === index ? 'focus' : ''}`} onClick={() => handleRowClick(index)}>
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
            ) : (
                <div className="table-error-massage">Ви ще не додали жодного елемента</div>
            )}
        </div>
    )
}