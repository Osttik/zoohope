import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
export const FooterNavBlockText = ({ props }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <li className="footer-nav-block__item">
      <p className="footer-nav-block__text">{t(props.i18Key)}</p>
    </li>
  );
};
