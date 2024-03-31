import NavLink from "react-bootstrap/esm/NavLink";



export const FooterSocialMedia = ({props}: any) => {
   return (
     <NavLink className="footer-nav-block__social-media-icon" href={props.url}>
       <img src={props.src} alt={props.alt} />
     </NavLink>
   );
}

