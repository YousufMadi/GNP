import React from "react";

import "../../stylesheets/RequestTimeline/requestpost.css";

class RequestPost extends React.Component {
  state = { postUser: null };
  componentDidMount() {
    for (let i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].id === this.props.post.author) {
        this.setState({ postUser: this.props.users[i] });
        break;
      }
    }
  }
  sizeEstimate = () => {
    let size = null;
    if (this.props.post.items.length <= 3) {
      size = "Small";
    } else if (this.props.post.items.length <= 8) {
      size = "Medium";
    } else {
      size = "Large";
    }
    return size;
  };
  renderItems() {
    return this.props.post.items.map((item) => {
      return <li className="request-item">{item}</li>;
    });
  }
  render() {
    if (this.state.postUser !== null) {
      return (
        <div className="posted-request">
          <div className="users-pic-name">
            <img
              className="post-user-pic"
              src={this.state.postUser.profile_picture}
              alt="profile-pic"
            />
            <label className="post-user-title">
              <span className="post-user-name">
                {this.state.postUser.first_name}
              </span>{" "}
              <span className="post-user-payment">
                is paying by{" "}
                <span className="payment-type">
                  {this.props.post.reimbursement}
                </span>
              </span>
            </label>
          </div>

          <div className="post-description">
            <ul className="request-items-list">{this.renderItems()}</ul>
            <p className="additional-information">
              <label className="more-info">Additional Information</label>
              {this.props.post.description}
            </p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default RequestPost;
