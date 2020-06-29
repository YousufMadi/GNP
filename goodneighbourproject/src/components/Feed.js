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
    const currentUser = this.props.users_state.currentUser;

    if (currentUser === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="feedContainer">
        <Sidebar
          handleUserLogout={this.props.handleUserLogout}
          users_state={this.props.users_state}
          changeFilterState={this.handleFilterChange}
        />
        <RequestTimeline
          users_state={this.props.users_state}
          filterState={this.state}
          posts={this.props.posts}
        />
      </div>
    );
  }
}

export default Feed;
