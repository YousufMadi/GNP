import React from "react";
import "../../stylesheets/userupdateform.css";

import { connect } from "react-redux";
import { getUserById } from "../../actions/user";
import { updateUser } from "../../actions/user";

import Upload from "../Upload/Upload";

class UserUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.props.currentUser._id, this.state);
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const currentUser = this.props.currentUser;
    return (
      <div className={`user-update-info ${this.props.adminClass}`}>
        {this.props.adminClass ? <></> : <h3>Update Information</h3>}

        {/*<p className="success_msg">{this.state.success_msg}</p>*/}
        <form className="update-form" onSubmit={this.formSubmit}>
          <div className="update-input-container">
            <label>First Name</label>
            <input
              name="first_name"
              type="text"
              placeholder={currentUser.first_name}
              onChange={this.handleChange}
            ></input>
            {/*<p className="error_msg">{this.state.first_name_error}</p>*/}
          </div>

          <div className="update-input-container">
            <label>Last Name</label>
            <input
              name="last_name"
              type="text"
              placeholder={currentUser.last_name}
              onChange={this.handleChange}
            ></input>
            {/*<p className="error_msg">{this.state.last_name_error}</p>*/}
          </div>

          <div className="update-input-container">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder={currentUser.email}
              onChange={this.handleChange}
            ></input>
            {/*<p className="error_msg">{this.state.email_error}</p>*/}
          </div>

          <div className="update-input-container">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            ></input>
            {/*<p className="error_msg">{this.state.password_error}</p>*/}
          </div>

          <div className="update-input-container">
            <label>Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            ></input>
            {/*<p className="error_msg">{this.state.password_error}</p>*/}
          </div>

          <div className="update-input-container">
            <Upload />
          </div>

          <div className="update-input-container">
            <button
              className="update-submit"
              type="buton"
              onSubmit={this.formSubmit}
            >
              Update info
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { getUserById, updateUser })(
  UserUpdateForm
);
