import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../stylesheets/sidebar.css";

import { logout } from "../../actions/user";
import { filterPosts } from "../../actions/timeline";

class Sidebar extends React.Component {
  /* Initializing this component's state with 
   the dropdown filter options defaulting to null */
  state = { filterDistance: null, filterSize: null, filterPayment: null };

  /* This function handles the situation where the user clicks log out */
  handleUserLogout = () => {
    this.props.logout();
  };

  /* The functions that will handle a change in it's respective select html element */
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
     that the RequestTimeline can update it's filtering state. */
  handleFilterClick = () => {
    const filterRequest = {
      ...this.state,
    };
    this.props.filterPosts(filterRequest, this.props.currentUserLocation);
  };

  /* This functions is responsible for retrieving the rating, in terms of stars, associated with the author's account */
  renderRating() {
    let renderStarsReturn = [];
    for (let i = 0; i < this.props.currentUser.rating; i++) {
      renderStarsReturn.push(<i key={i} className="fas fa-star"></i>);
    }
    return renderStarsReturn;
  }

  /* Render Functions */
  renderProfile() {
    const currentUser = this.props.currentUser;
    return (
      <>
        <div className="profile-header">
          <img src={currentUser.profile_picture} alt="profile"></img>
          <div className="profile-info">
            <p>
              {currentUser.first_name} {currentUser.last_name}
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
        <div className="dropdown-filters">
          <select
            defaultValue={"any"}
            onChange={(e) => this.handleDistanceChange(e)}
          >
            <option value="any">Any Distance</option>
            <option value="1">{"< 1km"}</option>
            <option value="5">{"< 5km"}</option>
            <option value="20">{"< 20km"}</option>
            <option value="21">{"20+km"}</option>
          </select>

          <select
            defaultValue={"any"}
            onChange={(e) => this.handleSizeChange(e)}
          >
            <option value="any">Any Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <select
            defaultValue={"any"}
            onChange={(e) => this.handlePaymentChange(e)}
          >
            <option value="any">Any Payment</option>
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

  render() {
    return (
      <div className="sidebar">
        {this.renderProfile()}
        {this.renderFilter()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { logout, filterPosts })(Sidebar);
