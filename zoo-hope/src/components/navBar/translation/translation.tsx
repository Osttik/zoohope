interface Iprops {
  lang: {
    setSelectedLanguage: Function,
    changeLanguage: Function,
    selectedLanguage: string
  }
}

const langs = ["UA", "EN"];

export const Translation = (props: Iprops) => {
  return (
    <div className="navbar__button-group">
      {
        langs.map((lang, i) => (
          <button
            key={i}
            className={`navbar__button-group__${lang} ${props.lang.selectedLanguage === lang ? "navbar__button-group__clicked" : ""}`}
            onClick={() => {
              props.lang.setSelectedLanguage(lang);
              props.lang.changeLanguage(lang.toLocaleLowerCase());
            }}
          >
            {lang}
          </button>
        ))
      }
    </div>
  )
}