import "../../stylesheets/settingsAdmin.css";
import React from "react";
import { getNumUsers } from "../../actions/user";
import { getNumCompletedPosts, getNumPendingPosts } from "../../actions/timeline";

class AppStats extends React.Component {

  state = {
    num_users: 0,
    num_requests_completed: 0,
    num_requests_pending: 0,
  }

  componentDidMount() {
    this.getAllUserCount();
    this.getPostInfo();
  }

  async getAllUserCount() {
    const num_users = await getNumUsers();

    this.setState({
      num_users,
    })
  }

  async getPostInfo() {
    const num_requests_completed = await getNumCompletedPosts();
    const num_requests_pending = await getNumPendingPosts();

    this.setState({
      num_requests_completed,
      num_requests_pending
    })
  }

  render() {
    return (
      <div className="statsContainer">
        <ul className="flexStats">
          <li className="displayStats">
            NUMBER OF ACTIVE USERS <p>{this.state.num_users}</p>
          </li>
          <li className="displayStats">
            NUMBER OF REQUESTS COMPLETED<p>{this.state.num_requests_completed}</p>
          </li>
          <li className="displayStats">
            NUMBER OF REQUESTS PENDING COMPLETION<p>{this.state.num_requests_pending}</p>
          </li>
        </ul>
      </div>
    );
  }
};

export default AppStats;
