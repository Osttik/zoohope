import NavLink from "react-bootstrap/esm/NavLink";

export const FooterNavBlockLink = ({ props }: any) => {
  return (
    <li className="footer-nav-block__item">
      <NavLink href="#" className="footer-nav-block__link">
        {props.name}
      </NavLink>
    </li>
  );
};
