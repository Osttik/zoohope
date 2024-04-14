import { Link } from "react-router-dom";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { Translate } from "../translation";

export const FooterNavBlockText = ({ props }: any) => {
  const { t } = useTranslation()
  console.log(props)

  return (
    <li className="footer-nav-block__item">
      <p className="footer-nav-block__text">
        {
          !props.url ?
            <>{Translate(props.name)}: {props.value}</> :
            <><Link to={props.url}>{Translate(props.name)}</Link></>
        }
      </p>
    </li>
  );
};
