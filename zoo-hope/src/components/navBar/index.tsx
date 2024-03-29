import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../styles/index.scss";
import { useEffect, useState } from "react";
import LogoNavBar from "../../images/logo/logo.png"
import { elements } from "../../data/nav";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"
import { BurgerMenu } from "./burger/burger";

interface Istates {
  [key: string]: boolean
}


export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<"UA" | "EN">("UA")

  const [states, setStates] = useState<Istates>({ burger: false, })

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
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
            arr[e] = false
            console.log(arr)
          }
          console.log("burgur")
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
    if (!tgt.closest(".allOptions") && !tgt.closest(".burger")) {
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
        <img src={LogoNavBar} alt="Logo" className="navbar__logo" />
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
                    className="navbar__group__dropdown-item navbar__text"
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
        <div className="navbar__additional-buttons">
          <div className="navbar__button-group">
            <button
              className={`navbar__button-group__UA ${selectedLanguage === "UA" ? "navbar__button-group__clicked" : ""
                }`}
              onClick={() => {
                setSelectedLanguage("UA");
                changeLanguage("ua");
              }}
            >
              UA
            </button>
            <button
              className={`navbar__button-group__EN ${selectedLanguage === "EN" ? "navbar__button-group__clicked" : ""
                }`}
              onClick={() => {
                setSelectedLanguage("EN")
                changeLanguage("en");
              }}
            >
              EN
            </button>
          </div>
          <BurgerMenu elements={elements} states={states} handleOpen={handleDropdownOpen} />
        </div>
      </div>
    </div>
  );
};
