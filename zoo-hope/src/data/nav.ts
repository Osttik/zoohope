// function query(){
// if(sessionStorage.getItem('queryParams')){return `/petList${sessionStorage.getItem('queryParams')}`}
// else return "/petList?page=1"
// }
const elements = [
  { name: "Про нас", url: "/", i18Key: "about-us" },
  { name: "Контакти", url: "#footer", i18Key: "contacts" },
  {
    name: "Звітність",
    i18Key: "accounting",
    Ielements: [{ name: "DropDownLink1", url: "/" }],
  },
  {
    name: "Шукають дім",
    i18Key: "looking-for-home",
    Ielements: [{ name: "Pet List", url: "/petList?page=1" }],
  },
  {
    name: "Лікування",
    i18Key: "therapy",
    Ielements: [{ name: "DropDownLink1", url: "/" }],
  },
  {
    name: "Стерилізація",
    i18Key: "sterilization",
    Ielements: [{ name: "DropDownLink1", url: "/" }],
  },
];
export { elements }