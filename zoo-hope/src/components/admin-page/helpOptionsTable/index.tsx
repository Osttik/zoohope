import axios from "axios";
import { useState, useEffect } from "react";

interface IHelpOptionsTableProps {
    url: string;
    activeButton: string;
    selectedRowIndex: null | number;
    handleRowClick: (index: number) => void;
}

interface IHelpOptionsTable {
    name: string;
    description: string;
    _id: string;
}

export const HelpOptionsTable = ({ url, activeButton, selectedRowIndex, handleRowClick  }: IHelpOptionsTableProps) => {
    const [helpOptions, setHelpOptions] = useState<IHelpOptionsTable[]>([]);

    useEffect(() => {
        const getAllHelpOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/${url}`);
                setHelpOptions(response.data);

            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        getAllHelpOptions();
    }, [url]);

    console.log(helpOptions);
    return (
        <div className="help-options-table-container">
            {helpOptions.length > 0 ? (
                <table className="help-options-table">
                    <thead>
                        <tr className="help-options-table__row">
                            <th>№</th>
                            <th>Назва</th>
                            <th>Опис</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {helpOptions.map((option: any, index: number) => (
                            <tr key={option._id} className={`pet-table__row ${selectedRowIndex === index ? 'focus' : ''}`} onClick={() => handleRowClick(index)}>
                                <td>{index + 1}</td>
                                <td>{option.name}</td>
                                <td>{option.description}</td>
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