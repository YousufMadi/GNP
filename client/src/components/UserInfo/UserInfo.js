import React from "react";
import "../../stylesheets/userinfo.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserById } from "../../actions/user";
import { getNumPostsByUserId } from "../../actions/timeline";


class UserInfo extends React.Component {

  

  render() {
    const currentUser = this.props.currentUser;

    return (
      <div className="user-curr-info">
        <Link to="/feed">
          <button className="back-button">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
        </Link>
        <div className="profile-img">
          <img src={currentUser.profile_picture} alt="profile" />
        </div>
        <h3>
          {currentUser.first_name} {currentUser.last_name}{" "}
        </h3>
        <h4>{currentUser.email}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { getUserById })(UserInfo);
