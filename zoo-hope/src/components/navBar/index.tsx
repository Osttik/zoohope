import NavDropdown from "react-bootstrap/NavDropdown";
import "../../styles/index.scss";
import { useEffect, useState } from "react";
import LogoNavBar from "../../images/logo/logo.png"
import { elements } from "../../data/nav";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"
import { BurgerMenu } from "./burger/burger";
import { Translation } from "./translation/translation";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

interface Istates {
  [key: string]: boolean
}

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<"UA" | "EN">("UA")

  const [states, setStates] = useState<Istates>({ burger: false, })

  const navigate = useNavigate()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const lang = {
    setSelectedLanguage: setSelectedLanguage,
    selectedLanguage: selectedLanguage,
    changeLanguage: changeLanguage
  }

  useEffect(() => {
    let arr: Istates = {}

    arr.burger = false
    elements.forEach((e) => {
      arr[e.i18Key] = false
    })

    setStates(arr)
  }, [])


  // Toggles state. In case of menu closing, closes every children dropdown
  const handleDropdownOpen = (name: any) => {
    if (name === "burger") {
      if (states.burger) {
        let arr: Istates = {}
        Object.keys(states).forEach(e => {
          if (e !== "burger") {
            arr[e] = false;
          }
        });
        setStates(arr)
      } else {
        setStates({ ...states, [name]: !states[name] })
      }
    } else {
      setStates({ ...states, [name]: !states[name] })
    }
  }

  // Closes burger menu if user clicked out of menu
  window.onclick = (e) => {
    const tgt = e.target as HTMLElement
    if (!tgt.closest(".allOptions") && !tgt.closest(".container-navbar") || tgt.closest(".navbar__logo")) {
      setStates({ ...states, "burger": false })
    }
  }

  //Clocec burger menu if user scrolled
  window.onscroll = () => {
    setStates({ ...states, "burger": false })
  }

  return (
    <div className="container-navbar">
      <div className="navbar">
        <img src={LogoNavBar} alt="Logo" className="navbar__logo" onClick={() => { navigate("/") }} />
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
                      as={Link}
                      to={e.url!}
                      className="navbar__group__dropdown-item"
                      key={keyInner}
                    >
                      {e.name}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            ) : (
              <HashLink smooth to={e.url!} key={key} className="navbar__group__link navbar__text asdasda">
                {t(e.i18Key)}
              </HashLink>
            )
          )}
        </div>
        <div className="navbar__additional-buttons">
          <Translation lang={lang} />

          <BurgerMenu elements={elements} states={states} handleOpen={handleDropdownOpen} lang={lang} />
        </div>
      </div>
    </div>
  );
};
