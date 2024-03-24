import { apiGetContacts } from "../api/contacts";

const fetchContacts = async () => {
  try {
    const contactsData = await apiGetContacts();
    return contactsData;
  } catch (error) {
    console.log("Contacts Fetch Error: ", error);
    return [];
  }
};

const createElements = async () => {
  const contacts = await fetchContacts();

  const elements = [
    {
      listName: "Про нас",
      IListItems: [
        { name: "Хто ми?", url: "/" },
        { name: "Наша історія", url: "/" },
        { name: "Навіщо ми це робимо?", url: "/" },
      ],
    },
    {
      listName: "Шукають дім",
      IListItems: [
        { name: "Собаки", url: "/" },
        { name: "Коти", url: "/" },
        { name: "Інші тварини", url: "/" },
      ],
    },
    {
      listName: "Лікування",
      IListItems: [
        { name: "Test1", url: "/" },
        { name: "Test2", url: "/" },
        { name: "Test3", url: "/" },
        { name: "Test4", url: "/" },
        { name: "Test5", url: "/" },
      ],
    },
    {
      listName: "Стерилізація",
      IListItems: [
        { name: "Test1", url: "/" },
        { name: "Test2", url: "/" },
        { name: "Test3", url: "/" },
      ],
    },
    {
      listName: "Контакти",
      listInput: "Ваше повідомлення",
      ISocialMedias: contacts,
      IListItems: [
        { name: "Email: test@gmail.com" },
        { name: "Телефон: +380XXXXXXX" },
        { name: "Написати нам:" },
      ],
    },
    {
      footerBottomText: "2024 copyright zoonadia",
    },
    {
      footerBottomLink: "Додаткова інформація",
      url: "/",
    },
  ];

  return elements;
};

export { createElements };
