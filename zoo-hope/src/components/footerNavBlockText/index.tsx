import "../../i18n/i18n";
import { Translate } from "../translation";

export const FooterNavBlockText = ({ props }: any) => {

  return (
    <li className="footer-nav-block__item">
      <p className="footer-nav-block__text">{Translate(props.name) + ": " + props.value}</p>
    </li>
  );
};
