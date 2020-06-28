import React from "react";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import "../../stylesheets/shared.css";
import "../../stylesheets/auth-forms.css";
import loginPic from "./login.svg";

const defaultState = {
  // Fields
  email: "",
  password: "",

  // Error message
  error_msg: "",
};

class Login extends React.Component {
  state = defaultState;

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    let valid_user = null;
    let error_msg = "";

    // Get the user object.
    let user = this.props.users_state.users.filter((u) => {
      return u.email === this.state.email && u.password === this.state.password;
    });

    // If the user was not found.
    if (user.length !== 1) {
      error_msg = "Email and password combination not found";
      this.setState({ error_msg });
    } else {
      valid_user = user[0];
    }

    return valid_user;
  };

  formSubmit = (e) => {
    e.preventDefault();

    const valid_user = this.validateForm();

    if (valid_user !== null) {
      this.setState(defaultState);
      this.props.handleUserLogin(this.props.users_state, valid_user);
    }
  };

  render() {
    if (this.props.users_state.currentUser) {
      return <Redirect to="/feed" />;
    }
    return (
      <>
        <Navbar />
        <div className="contentContainer">
          <div className="form-container">
            <h3>Login</h3>
            <img src={loginPic} alt="login"></img>
            <form onSubmit={this.formSubmit}>
              <p className="error_msg">{this.state.error_msg}</p>
              <div className="form-input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-input">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="form-input">
                <button id="submit" type="buton" onSubmit={this.formSubmit}>
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

export default Login;
