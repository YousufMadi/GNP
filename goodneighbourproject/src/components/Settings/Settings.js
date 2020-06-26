import React from "react";
import './settings.css'

const defaultState = {
  // Fields
  

  // Error message
  error_msg: ""
}

class Settings extends React.Component {

  state = defaultState;

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFilterChange = (newFilter) => {
    this.setState({ ...newFilter });
  };

  validateForm = () => {

    // let is_valid = true;
    // let error_msg = "";

    // // Get the user object.
    // let user = this.props.users.filter((u) => {
    //   return u.email === this.state.email && u.password === this.state.password;
    // });

    // // If the user was not found.
    // if(user.length !== 1){
    //   error_msg = "Email and password combination not found";
    //   this.setState({error_msg});
    //   is_valid = false;
    // }else{
    //   console.log(user);
    // }

    // return is_valid;

  }

  formSubmit = (e) => {
    e.preventDefault();

    // console.log(this.props.users);

    // const form_valid = this.validateForm();

    // if(form_valid){
    //   this.setState(defaultState);  
    // }

  }

  render() {
    return (
      <div>
        <div className="settings-container">
          <div className="settings-cover"></div>
          
          <div className="user-container">

            <div className="user-curr-info">
              <h2>User</h2>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;