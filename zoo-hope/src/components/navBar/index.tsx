import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../styles/index.scss";
import { useState } from "react";
import LogoNavBar from "../../images/logo/logo.png"
import { NavBarData } from "../../data/nav";

export const NavBar = () => {
  const {
    elements,
    clickedButtonUA,
    setClickedButtonUA,
    clickedButtonEN,
    setClickedButtonEN
  } = NavBarData()
  return (
    <div className="container-navbar">
      <div className="navbar">
        <img src={LogoNavBar} alt="Logo" className="navbar__logo"/>
        {elements.map((e) =>
          e.hasOwnProperty("Ielements") ? (
            <>
            <NavDropdown title={e.name} className="navbar__dropdown navbar__text">
              {e.Ielements && e.Ielements.map((e) => (
                <NavDropdown.Item href={e.url} className="navbar__dropdown-item navbar__text">
                  {e.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            </>
          ) : (
            <Nav.Link href={e.url} className="navbar__link navbar__text">
              {e.name}
            </Nav.Link>
          )
        )}
        <div className="navbar__button-group">
            <button className={`navbar__button-group__UA ${clickedButtonUA ? "navbar__button-group__UA-clicked" : ""}`} onClick={() => {
              setClickedButtonUA(true);
              setClickedButtonEN(false)}}>UA</button>
            <button className={`navbar__button-group__EN ${clickedButtonEN ? "navbar__button-group__EN-clicked" : ""}`} onClick={() => {
              setClickedButtonUA(false);
              setClickedButtonEN(true)}}>EN</button>
        </div>
      </div>
    </div>
  );
};
