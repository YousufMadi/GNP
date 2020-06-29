import React from "react";
import './settings.css';
import { Redirect } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import UserInfo from '../UserInfo/UserInfo';
import UserUpdateForm from '../UserUpdateForm/UserUpdateForm';

class Settings extends React.Component {

  render() {

    const currentUser = this.props.database.currentUser;
    if (currentUser === null) {
      return <Redirect to="/login" />;
    }
    return (
        <div className="settings-container">
          <div className="settings-cover"></div>
          <div className="user-container">

            <UserInfo currentUser={currentUser}/>

            <UserUpdateForm database={this.props.database} 
                            updateUser={this.props.updateUser}/>
            
          </div>
        </div>
    );
  }
}

export default Settings;