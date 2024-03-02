import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ua",
    debug: true,
    resources: {
      en: {
        translation: {
          "about-us": "About us",
          "contacts": "Contacts",
          "accounting": "Accounting",
          "looking-for-home": "Looking for home",
          "therapy": "Therapy",
          "sterilization": "Sterilization"
        },
      },
      ua: {
        translation: {
          "about-us": "Про нас",
          "contacts": "Контакти",
          "accounting": "Звітність",
          "looking-for-home": "Шукають дім",
          "therapy": "Лікування",
          "sterilization": "Стерилізація"
        },
      },
    },
  });

export default i18n;
