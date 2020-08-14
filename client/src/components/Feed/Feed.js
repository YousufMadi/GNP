import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Timeline from "../Timeline/Timeline";

import "../../stylesheets/feed.css";

import { getPosts } from "../../actions/timeline";

class Feed extends React.Component {
  /*

    ------- State Initialization ----------

      filterDistance: The value given by the select distance element in the sidebar
      filterSize: The value given by the select favour size element in the sidebar
      filterPayment: The value given by the select payment type element in the sidebar

      posts: Hardcoded requests and their information. This will require a databse fetch in later phases of the project.

    */

  state = {
    filterDistance: null,
    filterSize: null,
    filterPayment: null,
    setState: this.setState.bind(this),
  };

  componentDidMount() {
    this.props.getPosts();
  }

  /* This function will handle a change in the filter state by updating
      every filter option that needs to change */
  handleFilterChange = (newFilter) => {
    this.setState({ ...newFilter });
  };

  /* 
  
  ------- Render function ----------
     
     If the current user is not logged in, it redirects to the login page.

     If the current user has an active request they need to finish, it renders the 
     ActiveRequest component.

     If the current user is logged in and has no active request, they will be able to
     view the feed and all of the requests currently pending. 

  */
  render() {
    if (this.props.currentUser === null) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="feedContainer slide">
          <Timeline changeFilterState={this.handleFilterChange} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { getPosts })(Feed);
