import React from 'react';
import { Navbar } from 'react-bootstrap';
import logoIntusCare from '../Assets/logo_IntusCare.svg';
import "./Navbar.scss";
const NavBar = () => {
    return (
        <Navbar className="bg-body-tertiary" sticky="top">
            <img
              src={logoIntusCare}
            //   width="30"
            //   height="30"
              className="d-inline-block align-left logo-styling"
              alt="Intus-care-logo"
            />
      </Navbar>
    )
}

export default NavBar;