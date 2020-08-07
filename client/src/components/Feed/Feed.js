import React from "react";
import { Redirect } from "react-router-dom";
import Timeline from "../Timeline/Timeline";
import ActiveRequest from "../ActiveRequest/ActiveRequest";

import "../../stylesheets/feed.css";

import { getActiveRequest } from "../../actions/user";
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
    active_req: null,
    posts: null,
    setState: this.setState.bind(this),
  };

  /* This function will handle a change in the filter state by updating
      every filter option that needs to change */
  handleFilterChange = (newFilter) => {
    this.setState({ ...newFilter });
  };

  componentDidMount() {
    getActiveRequest(this.props.app.state.currentUser).then((res) => {
      if (res !== null) {
        this.setState({
          active_req: res,
        });
      }
    });
    getPosts().then((res) => {
      this.setState({
        posts: res,
      });
    });
  }

  /* 
  
  ------- Render function ----------
     
     If the current user is not logged in, it redirects to the login page.

     If the current user has an active request they need to finish, it renders the 
     ActiveRequest component.

     If the current user is logged in and has no active request, they will be able to
     view the feed and all of the requests currently pending. 

  */
  render() {
    if (this.props.app.state.currentUser === null) {
      return <Redirect to="/login" />;
    } else if (this.state.active_req !== null) {
      return (
        <div className="feedContainer">
          <ActiveRequest
            posts={[this.props.app.state.currentUser.active_post]}
            changeFilterState={this.handleFilterChange}
            app={this.props}
          />
        </div>
      );
    } else {
      return (
        <div className="feedContainer slide">
          <Timeline
            changeFilterState={this.handleFilterChange}
            app={this.props.app}
            posts_state={this.state}
          />
        </div>
      );
    }
  }
}

// if (currentUser === null) {
//       return <Redirect to="/login" />;
//     } else if (currentUser.active_post) {
//       return (
//         <div className="feedContainer">
//           <ActiveRequest
//             posts={[currentUser.active_post]}
//             changeFilterState={this.handleFilterChange}
//             users_state={this.props.users_state}
//             currentUser={currentUser}
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="feedContainer slide">
//         <Timeline
//           changeFilterState={this.handleFilterChange}
//           users_state={this.props.users_state}
//           posts_state={this.state}
//         />
//       </div>
//     );

export default Feed;
