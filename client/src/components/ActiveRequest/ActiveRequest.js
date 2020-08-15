import React from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Sidebar/Sidebar";
import Map from "../Timeline/Map";
import { connect } from "react-redux";

import "../../stylesheets/activerequest.css";

import { completePost } from "../../actions/user";

const keys = {
  key1: "AIzaSyCx3EBDjdwQ4Gb6698FPEWsTB7bNL_o7Ow",
  key2: "AIzaSyARRBVg-xS1QeLJMfoCSeQm5At4Q-E7luU",
};

class ActiveRequest extends React.Component {
  state = {
    postAuthor: this.props.currentUser.active_post.author,
  };

  completeRequest = () => {
    this.props.completePost(
      this.props.currentUser.active_post._id,
      this.props.currentUser._id
    );
  };

  renderItems = () => {
    return this.props.currentUser.active_post.items.map((item) => {
      return (
        <li key={uuidv4()} className="request-item">
          {item.name}
        </li>
      );
    });
  };

  render() {
    if (this.props.currentUser.active_post !== null) {
      return (
        <>
          <Sidebar currentUserLocation={this.props.currentUserLocation} />
          <div className="timeline">
            <div className="active-request-container">
              <div className="active-request-header">
                <h5>You have an active request...</h5>
              </div>
              <div className="active-request-author">
                <h4>
                  {this.state.postAuthor.first_name}
                  's Request
                </h4>
              </div>
              <div className="map-route">
                <Map
                  currentUserLocation={this.props.currentUserLocation}
                  active_post={true}
                  posts={[this.props.currentUser.active_post]}
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${keys.key2}`}
                  loadingElement={<div style={{ height: "100%" }} />}
                  containerElement={<div style={{ height: "100%" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                />
              </div>
              <div className="active-items-requested">
                <label>Items Requested</label>
                <ul className="request-items-list">{this.renderItems()}</ul>
              </div>
              <div className="active-description">
                <label>Description Provided</label>
                <p>{this.props.currentUser.active_post.description}</p>
              </div>
              <div className="end-active-request">
                <button id="complete-request" onClick={this.completeRequest}>
                  Request Completed
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, { completePost })(ActiveRequest);
