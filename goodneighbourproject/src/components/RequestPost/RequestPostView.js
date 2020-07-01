import React from "react";

class RequestPostView extends React.Component {
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

  renderItemSizeOrList() {
    if (this.props.postUser.id === this.props.currentUser.id) {
      return <ul className="request-items-list">{this.props.renderItems()}</ul>;
    } else {
      return (
        <p className="post-favour-size">
          {this.props.postUser.first_name} is asking for a {this.sizeEstimate()}{" "}
          favour.
        </p>
      );
    }
  }

  render() {
    return (
      <div className="posted-request">
        <div className="users-pic-name">
          <img
            className="post-user-pic"
            src={this.props.postUser.profile_picture}
            alt="profile-pic"
          />
          <label className="post-user-title">
            <span className="post-user-name">
              {this.props.postUser.first_name}
            </span>{" "}
            <span className="post-user-payment">
              is paying by{" "}
              <span className="payment-type">
                {this.props.post.reimbursement}
              </span>
            </span>
          </label>
          {this.props.postUser.id === this.props.currentUser.id ? (
            <>
              <button className="edit-post" onClick={this.props.editClick}>
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button
                className="delete-post"

                onClick={() => this.props.deletePost(this.props.posts_state, this.props.post.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </>
          ) : (
            <button
              className="accept-request"
              onClick={() => this.props.showConfirmation(this.props.post)}
            >
              Accept Request
            </button>
          )}
        </div>
        <div className="post-description">
          {this.renderItemSizeOrList()}
          <p className="additional-information">
            <label className="more-info">Additional Information</label>
            {this.props.post.description}
          </p>
        </div>
      </div>
    );
  }
}

export default RequestPostView;
