import NavLink from "react-bootstrap/esm/NavLink";
import { FooterNavBlockLink } from "../footerNavBlockLink";

export const FooterNavBlock = ({ props }: any) => {
  return (
    <div className="footer__nav-block footer-nav-block">
      <h5 className="footer-nav-block__title">{props.listName}</h5>
      <ul className="footer-nav-block__list">
        {props.IListItems?.map((e:any) => {
          return <FooterNavBlockLink props={e} />;
        })}
      </ul>
    </div>
  );
};
