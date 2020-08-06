import React from "react";
import bcrypt from "bcryptjs";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import "../../stylesheets/shared.css";
import "../../stylesheets/auth-forms.css";
import loginPic from "../../images/login.svg";

import { login } from "../../actions/user";

const defaultState = {
  // Fields
  email: "",
  password: ""
};

class Login extends React.Component {
  state = defaultState;

  // constructor(){
  //   super(props);
  // }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  formSubmit = (e, app) => {
    e.preventDefault();
    login(this, app);
  };

  render() {
    const {app} = this.props;
    if (app.state.currentUser) {
      return <Redirect to="/feed" />;
    }
    return (
      <>
        <Navbar />
        <div className="contentContainer slide">
          <div className="form-container">
            <h3>Login</h3>
            <img src={loginPic} alt="login"></img>
            <form onSubmit={e => this.formSubmit(e, app)}>
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
                  onSubmit={e => this.formSubmit(e, app)}
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
