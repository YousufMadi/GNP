import React from "react";
import CreateAdmin from "./CreateAdmin";

import { deleteUser } from "../../actions/user";

class ViewUsers extends React.Component {

  deleteUserAndPosts = (user) => {
    deleteUser(this.props.users_state, user.email);
  };

  renderUsers() {
    return this.props.users.users.map((user) => {
      return (
        <tr className="user-row">
          <td>{user.admin ? "Yes" : "No"}</td>
          <td>
            {user.first_name} {user.last_name}
          </td>
          <td>{user.email}</td>
          <td>{user.rating}</td>
          <td>
            <button className="remove-user">
              <i className="fas fa-trash" onClick={() => this.deleteUserAndPosts(user)}></i>

            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <>
        <CreateAdmin
          updateUser={this.props.updateUser}
          users={this.props.users}
        />
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
