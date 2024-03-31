import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../styles/index.scss";
import { useState } from "react";
import LogoNavBar from "../../images/logo/logo.png"
import { elements } from "../../data/nav";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<"UA" | "EN">("UA")

  const changeLanguage = (lang:string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="container-navbar">
      <div className="navbar">
        <img src={LogoNavBar} alt="Logo" className="navbar__logo" />
        <div className="navbar__group">
          {elements.map((e, key) =>
            e.hasOwnProperty("Ielements") ? (
              <NavDropdown
                title={t(e.i18Key)}
                className="navbar__group__dropdown navbar__text"
                key={key}
              >
                {e.Ielements &&
                  e.Ielements.map((e, keyInner) => (
                    <NavDropdown.Item
                      href={e.url}
                      className="navbar__group__dropdown-item"
                      key={keyInner}
                    >
                      {e.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            ) : (
              <Nav.Link href={e.url} key={key} className="navbar__group__link navbar__text">
                {t(e.i18Key)}
              </Nav.Link>
            )
          )}
        </div>
        <div className="navbar__button-group">
          <button
            className={`navbar__button-group__UA ${
              selectedLanguage === "UA" ? "navbar__button-group__clicked" : ""
            }`}
            onClick={() => {
              setSelectedLanguage("UA");
              changeLanguage("ua");
            }}
          >
            UA
          </button>
          <button
            className={`navbar__button-group__EN ${
              selectedLanguage === "EN" ? "navbar__button-group__clicked" : ""
            }`}
            onClick={() => {
              setSelectedLanguage("EN")
              changeLanguage("en");
            }}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};