const elements = [
  {
    listName: "Про нас",
    i18Key: "about-us",
    IListItems: [
      { name: "Хто ми?", i18Key: "who_we_are", url: "/" },
      { name: "Наша історія", i18Key: "our_story", url: "/" },
      { name: "Навіщо ми це робимо?", i18Key: "our_mission", url: "/" },
    ],
  },
  {
    listName: "Шукають дім",
    i18Key: "looking-for-home",
    IListItems: [
      { name: "Собаки", i18Key: "dogs", url: "/" },
      { name: "Коти", i18Key: "cats", url: "/" },
      { name: "Інші тварини", i18Key: "other_pets", url: "/" },
    ],
  },
  {
    listName: "Лікування",
    i18Key: "therapy",
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
    i18Key: "sterilization",
    IListItems: [
      { name: "Test1", url: "/" },
      { name: "Test2", url: "/" },
      { name: "Test3", url: "/" },
    ],
  },
  { i18Key: "contacts",
    i18Key2: "foot_placeholder",
    listName: "Контакти",
    listInput: "Ваше повідомлення",
    // ISocialMedias: [
    //   { src: "../../images/logo/instagram", url: "/", alt: "instagram" },
    //   { src: "../../images/logo/facebook", url: "/", alt: "facebook" },
    //   { src: "../../images/logo/twitter", url: "/", alt: "twitter" },
    // ],
    ISocialMedias: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png",
        url: "/",
        alt: "instagram",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
        url: "/",
        alt: "facebook",
      },
      {
        src: "https://cdn-icons-png.flaticon.com/512/3938/3938028.png",
        url: "/",
        alt: "twitter",
      },
    ],
    IListItems: [
      { name: "Email: test@gmail.com",i18Key: "foot_email" },
      { name: "Телефон: +380XXXXXXX",i18Key: "phone_num" },
      { name: "Написати нам:",i18Key: "text_us" },
    ],
  },
  {
    footerBottomText: "2024 copyright zoonadia",
  },
  {
    footerBottomLink: "Додаткова інформація", url: "/"
  }
];
export { elements };
