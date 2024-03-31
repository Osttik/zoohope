import { useEffect, useState } from "react";
import axios from "axios";
import { IPet } from "../../../define";

interface IPetTableProps {
    url: string;
    activeButton: string;
    selectedRowIndex: null | number;
    handleRowClick: (index: number) => void;
}


export const PetTable = ({ url, activeButton, selectedRowIndex, handleRowClick }: any) => {
    const [pets, setPets] = useState<IPet[]>([]);

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
                .filter((pet: any) => pet.type === 'Cat')
            setPets(data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const getDogs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`);
            const data = response.data
                .filter((pet: any) => pet.type === 'Dog')
            setPets(data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const getNeedTreatmentPet = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${url}`);
            const data = response.data
                .filter((pet: any) => pet.treatment === true)
            setPets(data);

        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    useEffect(() => {
        switch (activeButton) {
            case 'pets':
                getAllPets();
                break;
            case 'cats':
                getCats();
                break;
            case 'dogs':
                getDogs();
                break;
            case 'treatment':
                getNeedTreatmentPet();
                break;
        }
    }, [url]);

    console.log(pets);
    
    return (
        <div className="pet-table-container">
            {pets.length > 0 ? (
                <table className="pet-table">
                    <thead>
                        <tr className="pet-table__row">
                            <th>№</th>
                            <th>Ім'я</th>
                            <th>Тип</th>
                            <th>Стать</th>
                            <th>Вік</th>
                            <th>Порода</th>
                            <th>Розмір</th>
                            <th>Забарвлення</th>
                            <th>Характер</th>
                            <th>Стерилізація</th>
                            <th>Лікування</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet: IPet, index: number) => (
                            <tr key={index} className={`pet-table__row ${selectedRowIndex === index ? 'focus' : ''}`} onClick={() => handleRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{pet.name && pet.name.ua}</td>
                                <td>{pet.type}</td>
                                <td>{pet.sex}</td>
                                <td>{pet.age}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.size}</td>
                                <td>{pet.color}</td>
                                <td>{pet.personality && pet.personality.ua}</td>
                                <td>{pet.sterilization ? "Так" : "Ні"}</td>
                                <td>{pet.treatment ? "Потребує" : "Не потребує"}</td>
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