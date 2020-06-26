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
    if (this.props.currentUser === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="feedContainer">
        <Sidebar
          currentUser={this.props.currentUser}
          changeFilterState={this.handleFilterChange}
        />
        <RequestTimeline
          currentUser={this.props.currentUser}
          users={this.props.users}
          filterState={this.state}
        />
      </div>
    );
  }
}

export default Feed;
