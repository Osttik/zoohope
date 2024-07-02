import NavLink from "react-bootstrap/esm/NavLink";
import { requestURL } from "../../api/api";
import { TranslateFunc } from "../translation";
import { useTranslation } from "react-i18next";

export const FooterSocialMedia = ({ props }: any) => {
  const { i18n } = useTranslation(); 

  return (
    <NavLink className="footer-nav-block__social-media-icon" href={props.url}>
      <img src={`${requestURL}/${props.icon}`} alt={TranslateFunc(props.name, i18n)} />
    </NavLink>
  );
}

