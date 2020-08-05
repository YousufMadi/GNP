import React from "react";
import bcrypt from "bcryptjs";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import "../../stylesheets/shared.css";
import "../../stylesheets/auth-forms.css";
import loginPic from "../../images/login.svg";

import { handleUserLogin } from "../../actions/user";

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

  formSubmit = (e) => {
    e.preventDefault();
    handleUserLogin(this.state.email, this.state.password);
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
                <button
                  className="form-submit"
                  type="buton"
                  onSubmit={this.formSubmit}
                >
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
