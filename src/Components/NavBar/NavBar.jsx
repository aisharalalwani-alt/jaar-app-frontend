 import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGem,
  faHome,
  faNewspaper,
  faCalendarAlt,
  faStar,
  faUserCircle,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

function SimpleNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="my-navbar shadow-sm" variant="dark">
      <div className="my-navbar-container d-flex w-100 align-items-center">
        {/* Logo */}
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <FontAwesomeIcon icon={faGem} className="me-2" />
            MyNeighborhood
          </Navbar.Brand>
        </LinkContainer>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          {/* Nav in the center */}
          <Nav className="mx-auto text-center">
            <LinkContainer to="/">
              <Nav.Link><FontAwesomeIcon icon={faHome} className="me-1" />Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/posts">
              <Nav.Link><FontAwesomeIcon icon={faNewspaper} className="me-1" />Posts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/events">
              <Nav.Link><FontAwesomeIcon icon={faCalendarAlt} className="me-1" />Events</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/volunteers">
              <Nav.Link><FontAwesomeIcon icon={faStar} className="me-1" />Volunteers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/neighbors">
              <Nav.Link><FontAwesomeIcon icon={faUsers} className="me-1" /> Neighbors</Nav.Link>  
            </LinkContainer>
          </Nav>

          {/* Nav on the right */}
          <Nav className="text-center">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link><FontAwesomeIcon icon={faUserCircle} className="me-1" />Profile</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default SimpleNavBar;
