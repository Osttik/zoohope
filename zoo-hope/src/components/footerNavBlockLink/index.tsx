import NavLink from "react-bootstrap/esm/NavLink";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
export const FooterNavBlockLink = ({ props }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <li className="footer-nav-block__item">
      <NavLink href={props.url} className="footer-nav-block__link">
      {t(props.i18Key)?t(props.i18Key):props.name}
      </NavLink>
    </li>
  );
};
