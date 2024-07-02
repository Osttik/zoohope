import { Link } from "react-router-dom";
import "../../styles/helpUsPage/helpUsPage.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiGetAllHelpOptions } from "../../api/helpOptions";
import { IHelpOption } from "../../define";
import { links } from "../../data/helpUsPage";
import { TranslateFunc } from "../translation";
import i18n from "../../i18n/i18n";
import Arrow1 from "../../images/workImg/Arrow1.png";
import Arrow2 from "../../images/workImg/Arrow2.png";
import BackgroundForHelpUs from "../../images/background/0-0.png";
import { t } from "i18next";
const HelpUsPage: React.FC = () => {
  const [helpOptions, setHelpOptions] = useState<IHelpOption[]>([]);
  useEffect(() => {
    apiGetAllHelpOptions().then((e) => {
      setHelpOptions(e);
    });
  }, []);
  return (
    <>
      <section className="GeneralHelp">
        <div className="GeneralHelp__text">
          <h1>{t("helpUs")}</h1>
          <div className="GeneralHelp__button">
            <img src={Arrow1} className="GeneralHelp__button_arrow1" />
            <a href="#YouCanHelp">{t("help")}</a>
            <img src={Arrow2} className="GeneralHelp__button_arrow2" />
          </div>
          <img src={BackgroundForHelpUs} className="BackgroundForHelpUs" />
        </div>
      </section>
      <section className="YouCanHelp" id="YouCanHelp">
        <h2>{t("HowYouCanHelp")}</h2>
        <div className="YouCanHelp_Options">
          {helpOptions.map((option, i) => (
            <div key={i} className="YouCanHelp__Option">
              <span className="YouCanHelp__Option_title">
                <div
                  dangerouslySetInnerHTML={{
                    __html: TranslateFunc(option.name, i18n),
                  }}
                />
              </span>
              <span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: TranslateFunc(option.description, i18n),
                  }}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="WhereWe">
          <span>{t("WhereWe")}</span>
          <iframe
            className="WhereWe__map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32573.32108695322!2d25.84006405148263!3d51.34849810560319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47260d7bbc5d8b0d%3A0xfb28dbe30ef1e100!2z0JLQsNGA0LDRiCwg0KDRltCy0L3QtdC90YHRjNC60LAg0L7QsdC70LDRgdGC0Yw!5e0!3m2!1suk!2sua!4v1717269943059!5m2!1suk!2sua"
            width="600"
            height="450"
            style={{ border: 0 }} // Заміна рядка на об'єкт
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default HelpUsPage;
