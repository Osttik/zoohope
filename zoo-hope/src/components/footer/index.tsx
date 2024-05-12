import "../../styles/index.scss";
import { createElements } from "../../data/footer";
import LogoNavBar from "../../images/logo/logo-white.png";
import { FooterNavBlockLink } from "../footerNavBlockLink";
import { FooterBottomText } from "../footerBottomText";
import { FooterNavContactsBlock } from "../footerNavContactsBlock";
import { FooterNavBlock } from "../footerNavBlock";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [elements, setElements] = useState<Array<object>>()

  useEffect(() => {
    createElements().then(el => setElements(el))
  }, [])

  if (!elements) {
    return <></>
  }

  return (
    <footer id="footer" className="footer">
      <div className="footer__container">
        <div className="footer__logo-area">
          <img src={LogoNavBar} alt="zoonadia" className="footer__logo-img" />
          <p className="footer__logo-text">zoonadia</p>
        </div>
        <div className="footer__navigation">
          {elements.map((e: Object, i: number) =>
            e.hasOwnProperty("listInput") ? (
              <FooterNavContactsBlock key={i} props={e} />
            ) : (
              <FooterNavBlock key={i} props={e} />
            )
          )}
        </div>
        <div className="footer__bottom footer-bottom">
          {elements.map((e: Object, i: number) => {
            return e.hasOwnProperty("footerBottomText") && (
              <FooterBottomText key={i} props={e} />
            )
          })}
          {elements.map((e: Object, i: number) => {
            return e.hasOwnProperty("footerBottomLink") && (
              <FooterNavBlockLink key={i} props={e} />
            )
          })}
        </div>
      </div>
    </footer>
  );
};
