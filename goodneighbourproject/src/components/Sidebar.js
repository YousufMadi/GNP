import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  state = { displayDropdown: false };
  toggleDropdown = () => {
    this.setState({ displayDropdown: !this.state.displayDropdown });
  };
  renderDropdown() {
    if (this.state.displayDropdown) {
      return (
        <div id="profileDropdown" className="mt-1">
          <div className="dropdownItem py-2" id="profileLink">
            Profile Settings
          </div>
          <div className="dropdownItem py-2" id="logoutAction">
            Sign Out
          </div>
        </div>
      );
    } else {
      return (
        <div id="profileRating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      );
    }
  }
  render() {
    return (
      <div id="sidebar">
        <Link id="brandHeader" className="py-3" to="/">
          Good Neighbour Project
        </Link>
        <div id="profileSection">
          <div id="profilePicture">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMZz8UJl41ksFy3hqIBH0etAGJvtwND1REo5WuQiHEA1QGv-Kw&usqp=CAU"
              alt="profile"
            ></img>
          </div>
          <div id="profileName">
            <span id="name">John Doe </span>
            <span
              id="settingsIcon"
              onClick={this.toggleDropdown}
              className={`px-2 py-1 ${
                this.state.displayDropdown ? "active" : ""
              }`}
            >
              {this.state.displayDropdown ? (
                <i className="fas fa-chevron-up"></i>
              ) : (
                <i className="fas fa-chevron-down"></i>
              )}
            </span>
          </div>
        </div>
        {this.renderDropdown()}
        <div id="googleMapsDisplay"></div>
      </div>
    );
  }
}

export default Sidebar;
