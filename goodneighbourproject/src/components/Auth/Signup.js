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
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state.first_name,
                       this.state.last_name,
                       this.state.email,
                       this.state.password);

    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    })

  }

  render() {
    return (
      <div className="SignupFormContainer">
        <form className="SignupForm" onSubmit={this.formSubmit}>
          <div className="form-input">
            <input name="first_name" type="text" 
                   placeholder="First Name" onChange={this.handleChange}></input>
          </div>
          <div className="form-input">
            <input name="last_name" type="text"
                   placeholder="Last Name" onChange={this.handleChange}></input>
          </div>
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

export default Signup;
