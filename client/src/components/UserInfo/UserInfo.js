import React from "react";
import "../../stylesheets/userinfo.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserById } from "../../actions/user";


class UserInfo extends React.Component {

  // TODO: CHANGE THIS. For now, it simply gives everyone 5 stars
  renderRating() {
    let renderStarsReturn = [];
    for (let i = 0; i < this.props.currentUser.rating; i++) {
      renderStarsReturn.push(<i key={i} className="fas fa-star"></i>);
    }
    return renderStarsReturn;
  }

  findNumRequestsMade(){
    
  }

  findNumRequestsAccepted(){
    return;
  }

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
        <div className="user-ratings">{this.renderRating()}</div>
        <h4>{currentUser.email}</h4>
        <div className="requests-info">
          <p>Number of requests made: </p>
          <p>4</p>
        </div>
        <div className="requests-info">
          <p>Number of requests accepted: </p>
          <p>10</p>
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
export default connect(mapStateToProps, { getUserById })(UserInfo);
