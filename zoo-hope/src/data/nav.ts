// function query(){
// if(sessionStorage.getItem('queryParams')){return `/petList${sessionStorage.getItem('queryParams')}`}
// else return "/petList?page=1"

import { reportState } from "./general";

// }
const elements = [
  { name: "Про нас", url: "/", i18Key: "about-us" },
  { name: "Контакти", url: "#footer", i18Key: "contacts" },
  { name: "Допомогти нам", i18Key: "helpUs", url: "/helpUs" },
  {
    name: "Шукають дім",
    i18Key: "looking-for-home",
    Ielements: [{ name: "Pet List", url: "/petList?page=1" }],
  },
];

if (reportState) {
  elements.splice(2, 0, { name: "Звітність", i18Key: "accounting", url: "/#reports" })
}

export { elements }