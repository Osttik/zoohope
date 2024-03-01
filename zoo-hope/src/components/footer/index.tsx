import "../../styles/index.scss";
import { elements } from "../../data/footer";
import LogoNavBar from "../../images/logo/logo-white.png";
import sendIcon from "../../images/icons/send.svg";
import NavLink from "react-bootstrap/esm/NavLink";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-area">
          <img src={LogoNavBar} alt="zoonadia" className="footer__logo-img" />
          <p className="footer__logo-text">zoonadia</p>
        </div>
        <div className="footer__navigation">
          {elements.map((e) =>
            e.hasOwnProperty("listInput") ? (
              <div className="footer__nav-block footer-nav-block footer-nav-block_contacts">
                <h5 className="footer-nav-block__title">{e.listName}</h5>
                <ul className="footer-nav-block__list">
                  <li className="footer-nav-block__item">
                    <div className="footer-nav-block__social-media">
                      {e.ISocialMedias?.map((e) => {
                        return (
                          <NavLink
                            className="footer-nav-block__social-media-icon"
                            href={e.url}
                          >
                            <img src={e.src} alt={e.alt} />
                          </NavLink>
                        );
                      })}
                    </div>
                  </li>
                  {e.IListItems?.map((e) => {
                    return (
                      <li className="footer-nav-block__item">
                        <p className="footer-nav-block__text">{e.name}</p>
                      </li>
                    );
                  })}
                  <div className="footer-nav-block__input-area">
                    <input
                      className="footer-nav-block__input"
                      placeholder={e.listInput}
                      type="text"
                    />
                    <button className="footer-nav-block__button">
                      <img src={sendIcon} alt="" />
                    </button>
                  </div>
                </ul>
              </div>
            ) : (
              <div className="footer__nav-block footer-nav-block">
                <h5 className="footer-nav-block__title">{e.listName}</h5>
                <ul className="footer-nav-block__list">
                  {e.IListItems?.map((e) => {
                    return (
                      <li className="footer-nav-block__item">
                        <NavLink href="#" className="footer-nav-block__link">
                          {e.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
          )}
        </div>
        <div className="footer__bottom footer-bottom">
          {elements.map((e) => {
            return e.hasOwnProperty("footerBottomText") ? (
              <p className="footer-bottom__text">{e.footerBottomText}</p>
            ) : (
              <></>
            );
          })}
          {elements.map((e) => {
            return e.hasOwnProperty("footerBottomLink") ? (
              <NavLink href="#" className="footer-bottom__link">
                {e.footerBottomLink}
              </NavLink>
            ) : (
              <></>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
