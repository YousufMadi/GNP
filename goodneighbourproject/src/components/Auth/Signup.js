import React from "react";

import '../../stylesheets/shared.css'

class Signup extends React.Component {

  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  formSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <div className="SignupFormContainer">
        <form className="SignupForm" onSubmit={this.formSubmit}>
          <div className="form-input">
            <input id="first_name" type="text" 
                   placeholder="First Name" onChange={this.handleChange}></input>
          </div>
          <div className="form-input">
            <input id="last_name" type="text"
                   placeholder="Last Name" onChange={this.handleChange}></input>
          </div>
          <div className="form-input">
            <input id="email" type="email"
                   placeholder="Email" onChange={this.handleChange}></input>
          </div>
          <div className="form-input">
            <input id="password" type="password" 
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

export default Signup;
