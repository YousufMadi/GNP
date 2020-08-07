import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user";

class NavbarLinks extends React.Component {

  /* This function handles the situation where the user clicks log out */
  handleUserLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>


        {!this.props.currentUser &&
          <li>
            <Link to="/login">Login</Link>
          </li>
        }

        {/* {!this.props.currentUser &&
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        } */}


        {this.props.currentUser && (
          <li>
            <Link to="/feed">Feed</Link>
          </li>
        )}

        {this.props.currentUser && (
          <li onClick={this.handleUserLogout}>
            <Link>Logout</Link>
          </li>
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { logout })(NavbarLinks);
