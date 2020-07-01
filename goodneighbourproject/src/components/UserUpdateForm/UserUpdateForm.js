import React from "react";
import './userupdateform.css';
import NavbarLinks from "../Navigation/NavbarLinks";

class UserUpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.users_state.currentUser,
      // Error message
      first_name_error: "",
      last_name_error: "",
      email_error: "",
      password_error: "",

      // Success message
      success_msg: "",
    };
  }

  validateForm = () => {
    let first_name_error = "";
    let last_name_error = "";
    let email_error = "";
    let valid_email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let password_error = "";
    let is_valid = true;

    // Validate first name
    if (this.state.user.first_name === "") {
      first_name_error = "Please enter your first name";
      is_valid = false;
    }

    // Validate last name
    if (this.state.user.last_name === "") {
      last_name_error = "Please enter your last name";
      is_valid = false;
    }

    // Validate email
    const email_valid = valid_email_regex.test(this.state.user.email);
    if (!email_valid) {
      email_error = "Email entered is not valid";
      is_valid = false;
    }

    // Validate password
    if (this.state.user.password === "") {
      password_error = "Password is invalid";
      is_valid = false;
    }

    if (!is_valid) {
      this.setState({
        first_name_error,
        last_name_error,
        email_error,
        password_error,
      });
    }

    return is_valid;
  }

  formSubmit = (e) => {
    e.preventDefault();
    const form_valid = this.validateForm();
    const success_msg = "Profile updated successfully!";

    if (form_valid) {
      this.props.updateUser(this.props.users_state, this.state.user);
      this.setState({ success_msg })
    }

  }

  handleChange = (e) => {
    const { value, name } = e.target;
    console.log(e);
    e.persist();



    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      }
    });

    console.log(this.state);
  };

  render() {

    const currentUser = this.props.users_state.currentUser;
    return (
      <div className="user-update-info">
        <div className="update-form-nav">
          <NavbarLinks currentUser={currentUser} />
        </div>
        <h3>Update Information</h3>

        <p className="success_msg">{this.state.success_msg}</p>
        <form className="update-form" onSubmit={this.formSubmit}>

          <div className="update-input-container">
            <label>First Name</label>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              defaultValue={currentUser.first_name}
              onChange={this.handleChange}
            ></input>
            <p className="error_msg">{this.state.first_name_error}</p>

          </div>

          <div className="update-input-container">
            <label>Last Name</label>
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              defaultValue={currentUser.last_name}
              onChange={this.handleChange}
            ></input>
            <p className="error_msg">{this.state.last_name_error}</p>
          </div>

          <div className="update-input-container">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={this.handleChange}
            ></input>
            <p className="error_msg">{this.state.email_error}</p>
          </div>

          <div className="update-input-container">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              defaultValue={currentUser.password}
              onChange={this.handleChange}
            ></input>
            <p className="error_msg">{this.state.password_error}</p>
          </div>

          <div className="update-input-container">
            <button className="update-submit" type="buton" onSubmit={this.formSubmit}>
              Update info
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UserUpdateForm;