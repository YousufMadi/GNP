import React from "react";
import CreateAdmin from "./CreateAdmin";
import { getAllUsers, deleteUser, promoteUser } from "../../actions/user";

import { notifyError } from "../../Utils/notificationUtils";

class ViewUsers extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getAllUsers().then((users) => {
      this.setState({
        users: users,
      });
    });
  }

  deleteUserAndPosts = async (user) => {
    if (user.admin) {
      notifyError("Cannot delete admin");
    } else {
      const users = await deleteUser(user._id);
      if (users) {
        this.setState({
          users: users,
        });
      }
    }
  };

  promoteUser = async (userToPromote) => {
    const users = await promoteUser(userToPromote);
    if (users) {
      this.setState({ users: users });
    }
  };

  renderUsers() {
    return this.state.users.map((user) => {
      return (
        <tr className="user-row" key={user._id}>
          <td>{user.admin ? "Yes" : "No"}</td>
          <td>
            {user.first_name} {user.last_name}
          </td>
          <td>{user.email}</td>
          <td>
            <button className="remove-user">
              <i
                className="fas fa-trash"
                onClick={() => this.deleteUserAndPosts(user)}
              ></i>
            </button>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <>
        <CreateAdmin promoteUser={this.promoteUser} />
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
