import React from "react";
import Navbar from "../Navigation/Navbar";
import { Redirect } from "react-router-dom";
import "../../stylesheets/shared.css";
import "../../stylesheets/auth-forms.css";
import signupPic from "../../images/signup.svg";

import { addUser } from "../../actions/user";

const default_state = {
  // Fields
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  // password_confirmation: "",

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


  formSubmit = (e, app) => {
    e.preventDefault();
    addUser(this, app);
  }

  render() {
    const {app} = this.props;
    // if (this.props.users_state.currentUser) {
    //   return <Redirect to="/feed" />;
    // }
    return (
      <>
        <Navbar />
        <div className="contentContainer slide">
          <div className="form-container">
            <h3>Signup</h3>
            <img src={signupPic} alt="signup"></img>
            <form onSubmit={e => this.formSubmit(e, app)}>
              <div className="form-input">
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  onChange={this.handleChange}
                ></input>
                {/*<p className="error_msg">{this.state.first_name_error}</p>*/}
              </div>
              <div className="form-input">
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                ></input>
                {/*<p className="error_msg">{this.state.last_name_error}</p>*/}
              </div>
              <div className="form-input">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                ></input>

                {/*<p className="error_msg">{this.state.email_error}</p>*/}
              </div>
              <div className="form-input">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                ></input>

                {/*<p className="error_msg">{this.state.password_error}</p>*/}
              </div>
              {/*<div className="form-input">
                <input
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                ></input>

                <p className="error_msg">
                  {this.state.password_confirmation_error}
                </p>
              </div>*/}
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

export default Signup;
