import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translations/en.json";
import uaTranslation from "./translations/ua.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "ua",
    fallbackLng: "ua",
    debug: true,
    resources: {
      en: {
        translation: enTranslation,
      },
      ua: {
        translation: uaTranslation,
      },
    },
  });

export default i18n;
