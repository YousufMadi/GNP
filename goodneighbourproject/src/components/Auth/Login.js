import React from "react";

import '../../stylesheets/shared.css'

class Login extends React.Component {

  state = {
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

    console.log(this.props.users)

    // Get the user object.
    let user = this.props.users.filter((u) => {
      return u.email === this.state.email && u.password === this.state.password;
    });

    // If the user was not found.
    if(user.length != 1){
      console.log('not found');
    }else{
      console.log(user);
    }

    this.setState({
      email: "",
      password: ""
    })

  }

  render() {
    return (
      <div className="SignupFormContainer">
        <form className="SignupForm" onSubmit={this.formSubmit}>
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
