import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* Posts */}
      <Link to="/posts">Posts  </Link> | 
 
      {/* Events */}
      <Link to="/events">Events List</Link> | 
      <Link to="/events/new">Add Event</Link> |

      {/* Volunteers */}
      <Link to="/volunteers">top Volunteersnk </Link> |
 
      {/* Neighbors */}
      <Link to="/neighbors">Neighbors List</Link> | 
      

      
      {/* Auth */}
      <Link to="/signup">Sign Up</Link> |
      <Link to="/login">Login</Link> |
      <Link to="/logout">Logout</Link> |
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default NavBar;