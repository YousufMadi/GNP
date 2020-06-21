import React from "react";
import { Link } from "react-router-dom";

import Map from "./Map";
import "../../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  /* Initializing this component's state with 
   the dropdown filter options defaulting to null */
  state = { filterDistance: null, filterSize: null, filterPayment: null };

  /* The functions that will handle a change in it's
     respective select html */
  handleDistanceChange(e) {
    this.setState({ filterDistance: e.target.value });
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

  /* Render Functions */
  renderBrandHeader() {
    return (
      <div id="brand-header" className="mt-2 ml-1 mr-2">
        <label id="brand-label" className="py-2">
          Good Neighbour Project
        </label>
        <Link to="/" id="home-nav" className="px-3 py-2">
          <i className="fas fa-home"></i>
        </Link>
      </div>
    );
  }

  renderProfile() {
    return (
      <div id="profile-section" className="mt-1 pb-3">
        <div id="profile-img-area" className="ml-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU"
            alt="profile"
          ></img>
        </div>
        <div id="profile-info-area" className="ml-2">
          <label id="profile-info-name" className="mt-2">
            John Doe
          </label>
          <label id="rating-label">Standing</label>
          <label id="rating-stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </label>
        </div>
      </div>
    );
  }
  renderFilter() {
    return (
      <div id="filter-section" className="mx-2 mt-1">
        <input
          className="form-control"
          type="text"
          ref={(input) => (this.filterTermInput = input)}
          placeholder="Search term"
        />
        <select
          className="form-control my-1"
          onChange={(e) => this.handleDistanceChange(e)}
        >
          <option selected disabled value={null}>
            Distance
          </option>
          <option value="1">{"< 1km"}</option>
          <option value="5">{"< 5km"}</option>
          <option value="20">{"< 20km"}</option>
          <option value="20+">{"20+km"}</option>
        </select>
        <select
          className="form-control"
          onChange={(e) => this.handleSizeChange(e)}
        >
          <option selected disabled value={null}>
            Size
          </option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <select
          className="form-control"
          onChange={(e) => this.handlePaymentChange(e)}
        >
          <option selected disabled value={null}>
            Payment
          </option>
          <option value="cash">Cash</option>
          <option value="etransfer">E-transfer</option>
          <option value="cheque">Cheque</option>
        </select>
        <button className="btn" onClick={this.handleFilterClick}>
          Filter Requests
        </button>
      </div>
    );
  }
  renderGoogleMap() {
    return (
      <div id="google-maps-section" className="mt-2">
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
  renderFooter() {
    return (
      <div id="sidebar-actions">
        <div className="action settings-action">
          <Link to="/settings">
            <i className="fas fa-cog"></i>
          </Link>
        </div>
        <div className="action logout-action">
          <button>
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div id="sidebar">
        {this.renderBrandHeader()}
        {this.renderProfile()}
        {this.renderFilter()}
        {this.renderGoogleMap()}
        {this.renderFooter()}
      </div>
    );
  }
}
export default Sidebar;
