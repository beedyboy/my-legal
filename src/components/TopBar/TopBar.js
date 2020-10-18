import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Container,
  Nav,
  NavItem,
} from "reactstrap";

const TopBar = (props) => {
  const { scroll } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Fragment>
      <Navbar
        expand="lg"
        className={`"navbar navbar-dark pb_navbar pb_scrolled-light  ${scroll}`}
        id="templateux-navbar"
      >
        <Container>
          <NavbarBrand href="/">
            <span className="text-danger">My</span> Legal Solutions
          </NavbarBrand>
          <div
            onClick={toggle}
            className="site-menu-toggle js-site-menu-toggle  ml-auto"
            data-aos="fade"
            data-toggle="collapse"
            data-target="#templateux-navbar-nav"
            aria-controls="templateux-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Collapse isOpen={isOpen} navbar id="templateux-navbar-nav">
            <Nav navbar className="ml-auto">
              <NavItem className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact us
                </Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" to="practise-area">
                  Practise areas
                </Link>
              </NavItem>
              <NavItem className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0">
                <Link className="nav-link" to="#j">
                  <span className="pb_rounded-4 px-4 rounded">Get Started</span>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      
    </Fragment>
  );
};
export default TopBar;
