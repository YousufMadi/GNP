import React from "react";

import "../../stylesheets/RequestTimeline/requestpost.css";

class RequestPost extends React.Component {
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
    return (
      <div className="posted-request">
        <div className="users-pic-name">
          <img
            className="post-user-pic"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSf_Bf0-x44hsGqqcQwrTcNeLUSnYjlDuoql-hQHydDdBwxeCT2&usqp=CAU"
            alt="profile-pic"
          />
          <label className="post-user-title">
            <span className="post-user-name">{this.props.post.name}</span>{" "}
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
  }
}

export default RequestPost;
