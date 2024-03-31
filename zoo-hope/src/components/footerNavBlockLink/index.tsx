import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { Link } from "react-router-dom";

export const FooterNavBlockLink = ({ props }: any) => {
  const { t } = useTranslation();

  return (
    <li className="footer-nav-block__item">
      <Link to={props.url} className="footer-nav-block__link">
        {t(props.i18Key) ? 
          t(props.i18Key) :
          props.name
        }
      </Link>
    </li>
  );
};
