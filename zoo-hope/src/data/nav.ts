// function query(){
// if(sessionStorage.getItem('queryParams')){return `/petList${sessionStorage.getItem('queryParams')}`}
// else return "/petList?page=1"
// }
const elements = [
  { name: "Про нас", url: "/", i18Key: "about-us" },
  { name: "Контакти", url: "#footer", i18Key: "contacts" },
  { name: "Звітність", i18Key: "accounting", url: "/#reports" },
  { name: "Допомогти нам", i18Key: "helpUs", url: "/helpUs" },
  {
    name: "Шукають дім",
    i18Key: "looking-for-home",
    Ielements: [
      { name: "Всі тварини", url: "/petList?page=1" },
      { name: "Собаки", url: "/petList?page=1&type=dog&sex=&minAge=&maxAge=" },
      { name: "Коти", url: "/petList?page=1&type=cat&sex=&minAge=&maxAge=" },
    ],
  },
];
export { elements };
