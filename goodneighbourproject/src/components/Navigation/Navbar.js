import React from "react";
import NavbarLinks from "./NavbarLinks";

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar" id={this.props.id} >
        <NavbarLinks currentUser={this.props.currentUser} />
      </nav>
    );
  }
}

export default Navbar;