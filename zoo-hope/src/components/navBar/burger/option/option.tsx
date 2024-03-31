import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IProps {
  element: {
    name: string,
    i18Key: string,
    url?: string,
    Ielements?: {
      name: string,
      url: string,
    }[]
  }
  states: {
    [key: string]: boolean
  },
  handleOpen: Function,
}

export const Optionss = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <div className="option">
      <button className={props.states[props.element.i18Key] ? "down optionBtn" : "optionBtn"} onClick={() => { props.handleOpen(props.element.i18Key) }}>{t(props.element.i18Key)}</button>
      <div className={props.states[props.element.i18Key] ? "" : "closed"}>
        {props.element.Ielements?.map((e, key) => {
          return (
            <Link to={e.url} className="optionDropdown" key={key}>
              {(e.name)}
            </Link>
          )
        })}
      </div>
    </div>
  )
}