import { Link } from "react-router-dom";
import "../../styles/helpUsPage/helpUsPage.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiGetAllHelpOptions } from "../../api/helpOptions";
import { IHelpOption } from "../../define";
import { links } from "../../data/helpUsPage";
import { Translate, TranslateFunc } from "../translation";
import i18n from "../../i18n/i18n";
import Arrow1 from "../../images/workImg/Arrow1.png";
import Arrow2 from "../../images/workImg/Arrow2.png";
import BackgroundForHelpUs from "../../images/background/0-0.png";
const HelpUsPage: React.FC = () => {
  return (
    <>
      <section className="GeneralHelp">
        <div className="GeneralHelp__text">
          <h1>Допомогти нам</h1>
          <div className="GeneralHelp__button">
            <img src={Arrow1} className="GeneralHelp__button_arrow1" />
            <a href="#">Допомогти</a>
            <img src={Arrow2} className="GeneralHelp__button_arrow2" />
          </div>
          <img src={BackgroundForHelpUs} className="BackgroundForHelpUs" />
        </div>
      </section>
      <section className="YouCanHelp">
        <h2>Чим ви можете допомогти?</h2>
        <div className="YouCanHelp_Options">
          <div className="YouCanHelp__Options1">
            <span>🍗ЇЖА ДЛЯ ТВАРИН:</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpUsPage;
