import axios from "axios";
import { useState, useEffect } from "react";
import { ISetting } from "../../../define";

interface ISettingsTableProps {
  selectedRowIndex: null | number;
  handleRowClick: (index: number) => void;
  settings: ISetting[];
  setSettings: any;
  settingsTableUpdate: boolean;
}

export const SettingsTable = ({
  selectedRowIndex,
  handleRowClick,
  settings,
  setSettings,
  settingsTableUpdate,
}: ISettingsTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const url = "get-all-settings";

  //code for horizontal scroll of table cells
  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;

    if (target.tagName === "TD") {
      target.scrollLeft += event.deltaY;
    }
  };

  const handleWheelWrapper = (event: Event) => {
    const wheelEvent = event as WheelEvent;
    handleWheel(wheelEvent);
  };

  const sortByName = () => {
    const sortedSettings = [...settings];

    const compareFunction = (a: ISetting, b: ISetting) => {
      const nameA = a.key && a.key ? a.key.toLowerCase() : "";
      const nameB = b.key && b.key ? b.key.toLowerCase() : "";

      let comparison = 0;

      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }

      return comparison;
    };

    if (sortDirection === "asc") {
      sortedSettings.sort(compareFunction);
      setSortDirection("desc");
    } else {
      sortedSettings.sort((a, b) => compareFunction(b, a));
      setSortDirection("asc");
    }

    setSettings(sortedSettings);
  };

  useEffect(() => {
    const getAllSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${url}`);
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getAllSettings();
  }, [url, settingsTableUpdate]);

  console.log(settings);

  useEffect(() => {
    const tableBody = document.querySelector(".help-options-table tbody");
    if (tableBody) {
      tableBody.addEventListener("wheel", handleWheelWrapper);
    }

    return () => {
      if (tableBody) {
        tableBody.removeEventListener("wheel", handleWheelWrapper);
      }
    };
  }, []);
  return (
    <div className="help-options-table-container">
      {settings.length > 0 ? (
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
            {settings.map((option: ISetting, index: number) => (
              <tr
                key={option._id}
                className={`pet-table__row ${
                  selectedRowIndex === index ? "focus" : ""
                }`}
                onClick={() => handleRowClick(index)}
              >
                <td>{index + 1}</td>
                <td>{option.key}</td>
                <td>{option.value}</td>
                <td>{option._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="table-error-massage">
          Ви ще не додали жодного елемента
        </div>
      )}
    </div>
  );
};
