import React from "react";
import CreateAdmin from "./CreateAdmin";

import { getAllUsers, deleteUser } from "../../actions/user";
import { connect } from "react-redux";

class ViewUsers extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    getAllUsers()
      .then((users) => {
        console.log(users)
        this.setState({
          users: users,
        });
      })
  }

  // deleteUserAndPosts = (user) => {
  //   deleteUser(this.props.users_state, user.email);
  // };

  renderUsers() {
   
    return this.state.users.map((user) => {
      console.log(user)
      return (
        <tr className="user-row" key={user._id}>
          <td>{user.admin ? "Yes" : "No"}</td>
          <td>
            {user.first_name} {user.last_name}
          </td>
          <td>{user.email}</td>
          <td>{user.rating}</td>
          <td>
            <button className="remove-user">
              <i className="fas fa-trash" ></i>

            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <>
        {/*<CreateAdmin
          users={this.props.users}
        />*/}
        <table className="user-list-table">
          <thead>
            <tr id="users-list-header">
              <th className="promote-col" scole="col">
                Admin
              </th>
              <th className="name-col" scope="col">
                Name
              </th>
              <th className="email-col" scope="col">
                Email
              </th>
              <th className="rating-col" scope="col">
                Rating
              </th>
              <th className="remove-col" scope="col">
                Delete User
              </th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
      </>
    );
  }
}

export default ViewUsers;