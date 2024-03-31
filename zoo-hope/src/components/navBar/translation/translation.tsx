interface Iprops {
  lang: {
    setSelectedLanguage: Function,
    changeLanguage: Function,
    selectedLanguage: string
  }
}

export const Translation = (props: Iprops) => {
  return (
    <div className="navbar__button-group">
      <button
        className={`navbar__button-group__UA ${props.lang.selectedLanguage === "UA" ? "navbar__button-group__clicked" : ""
          }`}
        onClick={() => {
          props.lang.setSelectedLanguage("UA");
          props.lang.changeLanguage("ua");
        }}
      >
        UA
      </button>
      <button
        className={`navbar__button-group__EN ${props.lang.selectedLanguage === "EN" ? "navbar__button-group__clicked" : ""
          }`}
        onClick={() => {
          props.lang.setSelectedLanguage("EN")
          props.lang.changeLanguage("en");
        }}
      >
        EN
      </button>
    </div>
  )
}