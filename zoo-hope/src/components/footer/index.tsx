import "../../styles/index.scss";
import { createElements } from "../../data/footer";
import LogoNavBar from "../../images/logo/logo-white.png";
import { FooterNavBlockLink } from "../footerNavBlockLink";
import { FooterBottomText } from "../footerBottomText";
import { FooterNavContactsBlock } from "../footerNavContactsBlock";
import { FooterNavBlock } from "../footerNavBlock";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [elements, setelements] = useState<Array<object>>()

  useEffect(() => {
    createElements().then(el => setelements(el))
  }, [])

  if (!elements) {
    return <></>
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-area">
          <img src={LogoNavBar} alt="zoonadia" className="footer__logo-img" />
          <p className="footer__logo-text">zoonadia</p>
        </div>
        <div className="footer__navigation">
          {elements.map((e: Object) =>
            e.hasOwnProperty("listInput") ? (
              <FooterNavContactsBlock props={e} />
            ) : (
              <FooterNavBlock props={e} />
            )
          )}
        </div>
        <div className="footer__bottom footer-bottom">
          {elements.map((e: Object) => {
            return e.hasOwnProperty("footerBottomText") ? (
              <FooterBottomText props={e} />
            ) : (
              <></>
            );
          })}
          {elements.map((e: Object) => {
            return e.hasOwnProperty("footerBottomLink") ? (
              <FooterNavBlockLink props={e} />
            ) : (
              <></>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
