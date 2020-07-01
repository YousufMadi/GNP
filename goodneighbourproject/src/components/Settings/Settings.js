import React from "react";
import './settings.css';
import { Redirect } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import UserInfo from '../UserInfo/UserInfo';
import UserUpdateForm from '../UserUpdateForm/UserUpdateForm';

class Settings extends React.Component {

  render() {

    const currentUser = this.props.users_state.currentUser;
    if (currentUser === null) {
      return <Redirect to="/login" />;
    }
    return (
        <div className="settings-container">
          <div className="settings-cover"></div>
          <div className="user-container">

            <UserInfo currentUser={currentUser}/>

            <UserUpdateForm users_state={this.props.users_state} />
            
          </div>
        </div>
    );
  }
}

export default Settings;