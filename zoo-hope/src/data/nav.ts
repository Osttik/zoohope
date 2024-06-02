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
    Ielements: [
      { name: "Всі тварини", url: "/petList?page=1" },
      { name: "Собаки", url: "/petList?page=1&type=пес&sex=&minAge=&maxAge=" },
      { name: "Коти", url: "/petList?page=1&type=кіт&sex=&minAge=&maxAge=" },
    ],
  },
];

if (reportState) {
  elements.splice(2, 0, {
    name: "Звітність",
    i18Key: "accounting",
    url: "/#reports",
  });
}

export { elements };
