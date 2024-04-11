import { Link } from "react-router-dom";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";

export const FooterNavBlockText = ({ props }: any) => {
  const { t } = useTranslation()
  console.log(props.value)

  return (
    <li className="footer-nav-block__item">
      <p className="footer-nav-block__text">
        {
          !props.url ?
            <>{props.name}: {props.value}</> :
            <>{props.name}: {props.value ?
              <Link to={props.url}>{props.value}</Link> :
              <Link to={props.url}>{t("link")}</Link>}</>
        }
      </p>
    </li>
  );
};
