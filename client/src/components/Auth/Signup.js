import React from "react";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import "../../stylesheets/shared.css";
import "../../stylesheets/auth-forms.css";
import signupPic from "../../images/signup.svg";

import {
  addUser,
} from "../../actions/user";

const default_state = {
  // Fields
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",

  // Errors
  first_name_error: "",
  last_name_error: "",
  email_error: "",
  password_error: "",
  password_confirmation_error: "",
};

class Signup extends React.Component {
  state = default_state;

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    let first_name_error = "";
    let last_name_error = "";
    let email_error = "";
    let valid_email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let password_error = "";
    let password_confirmation_error = "";
    let is_valid = true;

    // Validate first name
    if (this.state.first_name === "") {
      first_name_error = "Please enter your first name";
      is_valid = false;
    }

    // Validate last name
    if (this.state.last_name === "") {
      last_name_error = "Please enter your last name";
      is_valid = false;
    }

    // Validate email
    const email_valid = valid_email_regex.test(this.state.email);
    if (!email_valid) {
      email_error = "Email entered is not valid";
      is_valid = false;
    }

    // Validate password
    if (this.state.password === "") {
      password_error = "Password is invalid";
      is_valid = false;
    }

    if (!(this.state.password === this.state.password_confirmation)) {
      password_confirmation_error = "Passwords do not match";
      is_valid = false;
    }    

    if (!is_valid) {
      this.setState({
        first_name_error,
        last_name_error,
        email_error,
        password_error,
        password_confirmation_error
      });
    }

    return is_valid;
  };

  formSubmit = (e) => {
    e.preventDefault();
    const form_valid = this.validateForm();


    if (form_valid) {
      addUser(
        this.props.users_state,
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.password
      );

      this.setState(default_state);
    }
  };

  render() {
    if (this.props.users_state.currentUser) {
      return <Redirect to="/feed" />;
    }
    return (
      <>
        <Navbar />
        <div className="contentContainer slide">
          <div className="form-container">
            <h3>Signup</h3>
            <img src={signupPic} alt="signup"></img>
            <form onSubmit={this.formSubmit}>
              <div className="form-input">
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
                ></input>
                <p className="error_msg">{this.state.first_name_error}</p>
              </div>
              <div className="form-input">
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                ></input>
                <p className="error_msg">{this.state.last_name_error}</p>
              </div>
              <div className="form-input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                ></input>

                <p className="error_msg">{this.state.email_error}</p>
              </div>
              <div className="form-input">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                ></input>

                <p className="error_msg">{this.state.password_error}</p>
              </div>
              <div className="form-input">
                <input
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                ></input>

                <p className="error_msg">{this.state.password_confirmation_error}</p>
              </div>
              <div className="form-input">
                <button className="form-submit" type="buton" onSubmit={this.formSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
