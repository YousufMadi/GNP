import React from "react";
import { Link } from "react-router-dom";

import Map from "./Map";
import "../../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  /* Initializing this component's state with 
   the dropdown filter options defaulting to null */
  state = { filterDistance: null, filterSize: null, filterPayment: null };

  /* This function handles the situation where the user clicks log out */
  handleUserLogout = () => {
    this.props.handleUserLogout(this.props.database);
  };

  /* The functions that will handle a change in it's
     respective select html */
  handleDistanceChange(e) {
    if (e.target.value === "Any Distance") {
    } else {
      this.setState({ filterDistance: e.target.value });
    }
  }

  handleSizeChange(e) {
    this.setState({ filterSize: e.target.value });
  }
  
  handlePaymentChange(e) {
    this.setState({ filterPayment: e.target.value });
  }

  /* The function that will handle a click on the filter request button.
     This function returns the current filter states back to the feed so
     that the RequestContainer can update it's filtering state. */
  handleFilterClick = () => {
    const filterRequest = {
      filterTerm: this.filterTermInput.value,
      ...this.state,
    };
    this.props.changeFilterState(filterRequest);
  };

  renderRating() {
    let renderStarsReturn = [];
    for (let i = 0; i < this.props.database.currentUser.rating; i++) {
      renderStarsReturn.push(<i className="fas fa-star"></i>);
    }
    return renderStarsReturn;
  }

  /* Render Functions */
  renderProfile() {
    const currentUser = this.props.database.currentUser;
    return (
      <>
        <div className="profile-header">
          <img src={currentUser.profile_picture} alt="profile"></img>
          <div className="profile-info">
            <p>
              {currentUser.first_name}{" "}
              {currentUser.last_name}
            </p>
            <div id="profile-rating">{this.renderRating()}</div>
          </div>
        </div>
        <div id="sidebar-tabs">
          <Link to="/">Home</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={this.handleUserLogout}>Log out</button>
        </div>
      </>
    );
  }
  renderFilter() {
    return (
      <div className="filter-section">
        <input
          type="text"
          ref={(input) => (this.filterTermInput = input)}
          placeholder="Search term"
        />

        <div className="dropdown-filters">
          <select onChange={(e) => this.handleDistanceChange(e)}>
            <option selected value="any">
              Any Distance
            </option>
            <option value="1">{"< 1km"}</option>
            <option value="5">{"< 5km"}</option>
            <option value="20">{"< 20km"}</option>
            <option value="20+">{"20+km"}</option>
          </select>

          <select onChange={(e) => this.handleSizeChange(e)}>
            <option selected value="any">
              Any Size
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <select onChange={(e) => this.handlePaymentChange(e)}>
            <option selected value="any">
              Any Payment
            </option>
            <option value="cash">Cash</option>
            <option value="e-transfer">E-transfer</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>

        <button
          type="button"
          className="filter-button"
          onClick={this.handleFilterClick}
        >
          Filter Requests
        </button>
      </div>
    );
  }
  renderGoogleMap() {
    return (
      <div className="google-maps-section">
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyARRBVg-xS1QeLJMfoCSeQm5At4Q-E7luU`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="sidebar">
        {this.renderProfile()}
        {this.renderFilter()}
        {this.renderGoogleMap()}
      </div>
    );
  }
}
export default Sidebar;
