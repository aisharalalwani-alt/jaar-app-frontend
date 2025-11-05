 import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGem,
  faHome,
  faNewspaper,
  faCalendarAlt,
  faStar,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-light shadow-sm" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faGem} className="me-2" />
          MyNeighborhood
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Navbar links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faNewspaper} className="me-1" />
              Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/volunteers" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faStar} className="me-1" />
              Top Volunteers
            </Nav.Link>
            <Nav.Link as={Link} to="/neighbors">Neighbors List</Nav.Link>
          </Nav>

          {/* Profile dropdown */}
          <Nav>
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                  Profile
                </span>
              }
              id="profile-dropdown"
            >
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
