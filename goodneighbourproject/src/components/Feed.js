import React from "react";
import { Redirect } from "react-router-dom";
import RequestTimeline from "./RequestTimeline/RequestTimeline";
import Sidebar from "./Sidebar/Sidebar";

import "../stylesheets/feed.css";
class Feed extends React.Component {
  state = {
    filterTerm: "",
    filterDistance: null,
    filterSize: null,
    filterPayment: null,
  };

  /* This function will handle a change in the filter state by updating
      every filter option that needs to change */
  handleFilterChange = (newFilter) => {
    this.setState({ ...newFilter });
  };

  render() {
    console.log(this.props.location);
    if (
      this.props.currentUser === null &&
      (this.props.location ? this.props.location.state.currentUser : null) ===
        null
    ) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="feedContainer">
        <Sidebar changeFilterState={this.handleFilterChange} />
        <RequestTimeline filterState={this.state} />
      </div>
    );
  }
}

export default Feed;
