import React from "react";
import { deletePost } from "../../actions/timeline";

class ViewRequest extends React.Component {
  /* This function returns an estimate for the size of the favour given the amount of elements in the items list. */
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

  /* Depending on if the current user is the author of this post, it shows the items list or just the estimate
     If the current user is the author, it shows the items list. Otherwise shows the estimate. */
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

  /* This function handles the clicking of a post to highlight it in the google maps area with in the sidebar.
     Can only be highlighted if the post does not belong to the current user.  */
  handlePostClick = () => {
    if (this.props.postUser.id !== this.props.currentUser.id) {
      this.props.highlightPost(this.props.post);
    }
  };

  /* 

  ------- Render function ----------

    If the current user is the author of this post, it renders an edit and delete button that allows the user
    to edit or delete the post accordingly. 

    If the current user is not the author of this post, it renders an accept request button that allows the user
    to accept this post, following their confirmation.

  */
  render() {
    return (
      <div
        className={`posted-request  ${
          this.props.postUser.id === this.props.currentUser.id
            ? ""
            : "other-author"
        }`}
        onClick={this.handlePostClick}
      >
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
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="delete-post"
                onClick={() =>
                  deletePost(this.props.posts_state, this.props.post.id)
                }
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

export default ViewRequest;
