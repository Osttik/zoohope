import React from "react"
import { Optionss } from "./option/option"
import { Translation } from "../translation/translation"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

interface IProps {
  elements: {
    name: string,
    i18Key: string,
    url?: string,
    Ielements?: {
      name: string,
      url: string,
    }[]
  }[],
  states: {
    [key: string]: boolean
  },
  handleOpen: any,

  lang: {
    setSelectedLanguage: Function,
    changeLanguage: Function,
    selectedLanguage: string
  }
}

export const BurgerMenu = (props: IProps) => {
  const { t } = useTranslation();
  return (
    <>
      <img src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/hamburger-menu-512.png" alt="burger menu icon" className="burger" onClick={() => { props.handleOpen("burger") }} />
      <div className={props.states.burger ? "open allOptions " : "closed allOptions"}>
        {props.elements.map((e, key) =>
          e.hasOwnProperty("Ielements") ? 
          (<Optionss element={e} states={props.states} handleOpen={props.handleOpen} key={key} />) : 
          (<Link to={e.url!} className="allOptions__link">{t(e.i18Key)}</Link>)
        )}
        <div className="inBurgerMenu">
          <Translation lang={props.lang} />
        </div>
      </div>
    </>
  )
}