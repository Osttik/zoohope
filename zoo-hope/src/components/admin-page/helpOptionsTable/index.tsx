import axios from "axios";
import { useState, useEffect } from "react";
import { IHelpOption } from "../../../define";

interface IHelpOptionsTableProps {
    selectedRowIndex: null | number;
    handleRowClick: (index: number) => void;
    helpOptions: IHelpOptionsTable[];
    setHelpOptions: any;
    helpOptionsTableUpdate: boolean;
}

interface IHelpOptionsTable {
    name: {
        ua: string;
        en: string;
    };
    description: {
        ua: string;
        en: string;
    };
    _id: string;
}

export const HelpOptionsTable = ({ selectedRowIndex, handleRowClick, helpOptions, setHelpOptions, helpOptionsTableUpdate }: IHelpOptionsTableProps) => {
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const url = 'get-all-help-options';

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
        const sortedHelpOptions = [...helpOptions];

        const compareFunction = (a: IHelpOptionsTable, b: IHelpOptionsTable) => {
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
            sortedHelpOptions.sort(compareFunction);
            setSortDirection('desc');
        } else {
            sortedHelpOptions.sort((a, b) => compareFunction(b, a));
            setSortDirection('asc'); 
        }
    
        setHelpOptions(sortedHelpOptions);
    };

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
    }, [url, helpOptionsTableUpdate]);

    console.log(helpOptions);

    useEffect(() => {
        const tableBody = document.querySelector('.help-options-table tbody');
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
        <div className="help-options-table-container">
            {helpOptions.length > 0 ? (
                <table className="help-options-table">
                    <thead>
                        <tr className="help-options-table__row">
                            <th>№</th>
                            <th onClick={sortByName}>Назва</th>
                            <th>Опис</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {helpOptions.map((option: IHelpOption, index: number) => (
                            <tr key={option._id} className={`pet-table__row ${selectedRowIndex === index ? 'focus' : ''}`} onClick={() => handleRowClick(index)}>
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