import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../stylesheets/settingsAdmin.css";

class CreateAdmin extends React.Component {
  state = { userToPromote: "" };

  handleInputChange = (e) => {
    this.setState({
      userToPromote: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.promoteUser(this.state.userToPromote);
    this.setState({ userToPromote: "" });
  };

  render() {
    return (
      <div className="make-user-admin">
        <form className="make-admin-form">
          <label className="make-admin-label">Make A User An Admin</label>

          <input
            type="text"
            name="name"
            value={this.state.userToPromote}
            placeholder="Email of user to promote"
            onChange={(e) => this.handleInputChange(e)}
          />
          <button
            className="promoteButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
          >
            Promote
          </button>
        </form>
      </div>
    );
  }
}

export default CreateAdmin;
