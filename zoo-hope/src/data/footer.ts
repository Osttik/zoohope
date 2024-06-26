import { getAllContacts } from "../api/contacts";

const fetchContacts = async () => {
  try {
    const data = await getAllContacts();
    return {
      socialMedias: data.filter(e => e.icon && e.url && !e.value) || [],
      contacts: data.filter(e => !e.icon) || []
    }
  } catch (error) {
    console.error("Contacts Fetch Error: ", error);
    return {
      contacts: [],
      socialMedias: []
    };
  }
};

const createElements = async () => {
  const data = await fetchContacts();

  const contacts = data.contacts
  const socialMedias = data.socialMedias

  const elements = [
    {
      listName: "Про нас",
      i18Key: "about-us",
      IListItems: [
        { name: "Хто ми?", i18Key: "who_we_are", url: "/#who_are_we?" },
        { name: "Наша історія", i18Key: "our_story", url: "/#our_story" },
        { name: "Навіщо ми це робимо?", i18Key: "our_mission", url: "/#why_are_we_doing_this?" },
      ],
    },
    {
      listName: "Шукають дім",
      i18Key: "looking-for-home",
      IListItems: [
        { name: "Собаки", i18Key: "dogs", url: "/petList?page=1&type=пес&sex=&minAge=&maxAge=" },
        { name: "Коти", i18Key: "cats", url: "/petList?page=1&type=кіт&sex=&minAge=&maxAge=" },
        { name: "Інші тварини", i18Key: "other_pets", url: "/petList" },
      ],
    },
    /*{
      listName: "Лікування",
      i18Key: "therapy",
      IListItems: [
        { name: "Test1", url: "/" },
        { name: "Test2", url: "/" },
        { name: "Test3", url: "/" },
        { name: "Test4", url: "/" },
        { name: "Test5", url: "/" },
      ],
    },*/
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
