import NavLink from "react-bootstrap/esm/NavLink";
import { FooterNavBlockLink } from "../footerNavBlockLink";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
export const FooterNavBlock = ({ props }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="footer__nav-block footer-nav-block">
      <h5 className="footer-nav-block__title">{t(props.i18Key)}</h5>
      <ul className="footer-nav-block__list">
        {props.IListItems?.map((e:any, i: number) => {
          return <FooterNavBlockLink key={i} props={e} />;
        })}
      </ul>
    </div>
  );
};
