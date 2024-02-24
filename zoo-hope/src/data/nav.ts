import { useState } from "react";
export const NavBarData = () => {
    
const elements = [
    { name: "Про нас", url: "/" },
    { name: "Контакти", url: "/" },
    {
      name: "Звітність",
      Ielements: [
        { name: "DropDownLink1", url: "/" },
      ],
    },
    {
      name: "Шукають дім",
      Ielements: [
        { name: "DropDownLink1", url: "/" },
      ],
    },
    {
      name: "Лікування",
      Ielements: [
        { name: "DropDownLink1", url: "/" },
      ],
    },
    {
      name: "Стерилізація",
      Ielements: [
        { name: "DropDownLink1", url: "/" },
      ],
    }]

    const [clickedButtonUA, setClickedButtonUA] = useState(true);
    const [clickedButtonEN, setClickedButtonEN] = useState(false);

    return {
        elements,
        clickedButtonUA,
        setClickedButtonUA,
        clickedButtonEN,
        setClickedButtonEN
    }
}