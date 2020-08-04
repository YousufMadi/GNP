import React from "react";
import NavbarLinks from "./NavbarLinks";

class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar" id={this.props.id} >
        <h2>The Good Neighbour</h2>
        <NavbarLinks currentUser={this.props.currentUser} />
      </nav>
    );
  }
}

export default Navbar;
