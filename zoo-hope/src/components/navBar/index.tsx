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
  const [clickedButtonUA, setClickedButtonUA] = useState(true);
  const [clickedButtonEN, setClickedButtonEN] = useState(false);

  const changeLanguage = (lang:string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="container-navbar">
      <div className="navbar">
        <img src={LogoNavBar} alt="Logo" className="navbar__logo"/>
        {elements.map((e) =>
          e.hasOwnProperty("Ielements") ? (
            <>
            <NavDropdown title={t(e.i18Key)} className="navbar__dropdown navbar__text">
              {e.Ielements && e.Ielements.map((e) => (
                <NavDropdown.Item href={e.url} className="navbar__dropdown-item navbar__text">
                  {e.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            </>
          ) : (
            <Nav.Link href={e.url} className="navbar__link navbar__text">
              {t(e.i18Key)}
            </Nav.Link>
          )
        )}
        <div className="navbar__button-group">
            <button className={`navbar__button-group__UA ${clickedButtonUA ? "navbar__button-group__UA-clicked" : ""}`} onClick={() => {
              setClickedButtonUA(true);
              setClickedButtonEN(false);
              changeLanguage("ua");
            }  }>UA</button>
            <button className={`navbar__button-group__EN ${clickedButtonEN ? "navbar__button-group__EN-clicked" : ""}`} onClick={() => {
              setClickedButtonUA(false);
              setClickedButtonEN(true)
              changeLanguage("en");
              }}>EN</button>
        </div>
      </div>
    </div>
  );
};
