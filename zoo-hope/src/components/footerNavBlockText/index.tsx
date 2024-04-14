import { Link } from "react-router-dom";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { Translate, TranslateFunc } from "../translation";

export const FooterNavBlockText = ({ props }: any) => {
  const { t } = useTranslation()
  console.log(props)

  return (
    <li className="footer-nav-block__item">
      <p className="footer-nav-block__text">
        {
          !props.url ?
            <><Translate obj={props.name} />: {props.value}</> :
            <><Link to={props.url}>{TranslateFunc(props.name)}</Link></>
        }
      </p>
    </li>
  );
};
