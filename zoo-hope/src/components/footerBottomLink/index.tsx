import NavLink from "react-bootstrap/esm/NavLink";

export const FooterNavBlockLink = ({ props }: any) => {
  return (
    <NavLink href="#" className="footer-bottom__link">
      {props.footerBottomLink}
    </NavLink>
  );
};
