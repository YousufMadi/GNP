import React from "react";

import '../../stylesheets/shared.css';
import '../../stylesheets/login.css';

const defaultState = {
  // Fields
  email: "",
  password: "",

  // Error message
  error_msg: ""
}

class Login extends React.Component {

  state = defaultState;

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  validateForm = () => {

    let is_valid = true;
    let error_msg = "";

    // Get the user object.
    let user = this.props.users.filter((u) => {
      return u.email === this.state.email && u.password === this.state.password;
    });

    // If the user was not found.
    if(user.length != 1){
      error_msg = "Email and password combination not found";
      this.setState({error_msg});
      is_valid = false;
    }else{
      console.log(user);
    }

    return is_valid;

  }

  formSubmit = (e) => {
    e.preventDefault();

    console.log(this.props.users);

    const form_valid = this.validateForm();

    if(form_valid){
      this.setState(defaultState);  
      // TODO: Handle redirection.
    }

  }

  render() {
    return (
      <div className="SignupFormContainer">
        <form className="SignupForm" onSubmit={this.formSubmit}>
          <p className="error_msg">{this.state.error_msg}</p>
          <div className="form-input">
            <input name="email" type="email"
                   placeholder="Email" onChange={this.handleChange}></input>
          </div>
          <div className="form-input">
            <input name="password" type="password" 
                   placeholder="Password" onChange={this.handleChange}></input>
          </div>
          <div>
            <button id="submit" type="buton" onSubmit={this.formSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
