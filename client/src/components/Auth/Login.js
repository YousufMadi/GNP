import React from "react";
import { connect } from "react-redux";

import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import "../../stylesheets/shared.css";
import "../../stylesheets/auth-forms.css";
import loginPic from "../../images/login.svg";

import { login } from "../../actions/user";

const defaultState = {
  // Fields
  email: "",
  password: "",
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
    console.log(this.state);
    this.props.login(this.state);
  };

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/feed" />;
    }
    return (
      <>
        <Navbar />
        <div className="contentContainer slide">
          <div className="form-container">
            <h3>Login</h3>
            <img src={loginPic} alt="login"></img>
            <form onSubmit={(e) => this.formSubmit(e)}>
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
                  onSubmit={(e) => this.formSubmit(e)}
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { login })(Login);
