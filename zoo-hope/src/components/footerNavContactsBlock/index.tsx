import NavLink from "react-bootstrap/esm/NavLink";
import { FooterSocialMedia } from "../footerSocialMedia";
import { FooterNavBlockText } from "../footerNavBlockText";
import sendIcon from "../../images/icons/send.svg";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
export const FooterNavContactsBlock = ({ props }: any) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="footer__nav-block footer-nav-block footer-nav-block_contacts">
      <h5 className="footer-nav-block__title">{t(props.i18Key)}</h5>
      <ul className="footer-nav-block__list">
        <li className="footer-nav-block__item">
          <div className="footer-nav-block__social-media">
            {props.ISocialMedias?.map((e:any) => {
              return <FooterSocialMedia props={e} />;
            })}
          </div>
        </li>
        {props.IListItems?.map((e:any) => {
          return <FooterNavBlockText props={e} />;
        })}
        <div className="footer-nav-block__input-area">
          <input
            className="footer-nav-block__input"
            placeholder={t(props.i18Key2)}
            type="text"
          />
          <button className="footer-nav-block__button">
            <img src={sendIcon} alt="" />
          </button>
        </div>
      </ul>
    </div>
  );
};
