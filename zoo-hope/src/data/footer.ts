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
      { name: "Собаки", url: "/petList?type=dog" },
      { name: "Коти", url: "/petList?type=cat" },
      { name: "Інші тварини", url: "/petList" },
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
      { name: "Email: test@gmail.com" },
      { name: "Телефон: +380XXXXXXX" },
      { name: "Написати нам:" },
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
