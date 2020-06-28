import React from "react";
import { Link } from "react-router-dom";

class NavbarLinks extends React.Component {

  render(){
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

        {!this.props.currentUser &&
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        }

        {this.props.currentUser &&
          <li>
            <Link to="/feed">Feed</Link>
          </li>
        }

        {this.props.currentUser &&
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        }


      </ul>
    );    
  }


}

export default NavbarLinks;
