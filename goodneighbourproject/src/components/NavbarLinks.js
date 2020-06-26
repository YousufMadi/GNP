import React from "react";
import { Link } from "react-router-dom";

function NavbarLinks() {
  return (
    <ul className="navbar-links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/feed">Feed</Link>
      </li>
    </ul>
  );
}

export default NavbarLinks;
