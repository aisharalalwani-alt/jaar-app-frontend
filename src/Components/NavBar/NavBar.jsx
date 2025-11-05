import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faStar, faHome, faCalendarAlt, faNewspaper, faGem, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

function NavBar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

   useEffect(() => {
    const setBodyPadding = () => {
      if (navRef.current) {
        document.body.style.paddingTop = `${navRef.current.offsetHeight}px`;
      }
    };

    setBodyPadding();
    window.addEventListener("resize", setBodyPadding);

    return () => window.removeEventListener("resize", setBodyPadding);
  }, [menuOpen]);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="logo">
        <FontAwesomeIcon icon={faGem} /> MyNeighborhood
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </div>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link>
        <Link to="/posts"><FontAwesomeIcon icon={faNewspaper} /> Posts</Link>
        <Link to="/events"><FontAwesomeIcon icon={faCalendarAlt} /> Events</Link>
        <Link to="/volunteers"><FontAwesomeIcon icon={faStar} /> Top Volunteers</Link>
        <Link to="/neighbors">Neighbors List</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile"><FontAwesomeIcon icon={faUserCircle} /> Profile</Link>
      </div>
    </nav>
  );
}

export default NavBar;