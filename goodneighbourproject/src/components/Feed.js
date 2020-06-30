import React from "react";
import { Redirect } from "react-router-dom";
import RequestTimeline from "./RequestTimeline/RequestTimeline";
import Sidebar from "./Sidebar/Sidebar";
import ActiveRequest from "./ActiveRequest/ActiveRequest";

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
    const currentUser = this.props.database.currentUser;

    if (currentUser === null) {
      return <Redirect to="/login" />;
    } else if (currentUser.active_post) {
      return (
        <div className="feedContainer">
          <Sidebar
            handleUserLogout={this.props.handleUserLogout}
            database={this.props.database}
            changeFilterState={this.handleFilterChange}
          />
          <ActiveRequest
            database={this.props.database}
            updateUser={this.props.updateUser}
            users={this.props.database.users}
            currentUser={currentUser}
          />
        </div>
      );
    }
    return (
      <div className="feedContainer">
        <Sidebar
          handleUserLogout={this.props.handleUserLogout}
          database={this.props.database}
          changeFilterState={this.handleFilterChange}
        />
        <RequestTimeline
          updateUser={this.props.updateUser}
          database={this.props.database}
          filterState={this.state}
          posts={this.props.posts}
          filterPosts={this.props.filterPosts}
          addPostToState={this.props.addPostToState}
          deletePost={this.props.deletePost}
          editPost={this.props.editPost}
        />
      </div>
    );
  }
}

export default Feed;
