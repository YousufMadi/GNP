import React from "react";
import "../../stylesheets/settings.css";
import { Redirect } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import UserUpdateForm from "../UserUpdateForm/UserUpdateForm";
import { getUserById } from "../../actions/user";
import { connect } from "react-redux";

class Settings extends React.Component {
  render() {
    const currentUser = this.props.currentUser;
    console.log(currentUser)
    if (currentUser === null) {
      return <Redirect to="/login" />;
    }
    // TODO: Admin view
    // } else if (currentUser.admin === true) {
    //   return <Redirect to="/admin" />;
    // }
    return (
      <div className="settings-container settings">
        <div className="user-container">
          {/*<UserInfo currentUser={currentUser} />*/}
          <UserInfo />

          {/*<UserUpdateForm users_state={this.props.users_state} />*/}
          {/*<UserUpdateForm />*/}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { getUserById })(Settings);
