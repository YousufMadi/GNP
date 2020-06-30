import React from "react";
import Modal from "react-modal";
import "../../stylesheets/RequestTimeline/postmodal.css";

import { fetchPostAuthor, getSizeEstimate } from "../../actions/timeline";

class PostModal extends React.Component {
  renderRating(author) {
    let renderStarsReturn = [];
    for (let i = 0; i < author.rating; i++) {
      renderStarsReturn.push(<i className="fas fa-star"></i>);
    }
    return renderStarsReturn;
  }
  render() {
    if (this.props.confirmation.display) {
      const request_author = fetchPostAuthor(
        this.props.confirmation.selectedPost,
        this.props.users
      );
      return (
        <Modal
          isOpen={this.props.confirmation.display ? true : false}
          onRequestClose={this.props.confirmation}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1031,
            },
            content: {
              padding: "0",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
              backgroundColor: " rgba(240,240,240,0.95)",
              width: "40%",
              minWidth: "300px",
              height: "50vh",
              margin: "auto",
            },
          }}
        >
          <div id="confirmation-modal-header">
            <button
              id="close-modal-btn"
              className="post-edit-cancel"
              onClick={this.props.closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <span>Are you sure you want to accept this request?</span>
          </div>
          <div id="confirmation-info">
            <div id="confirmation-author">
              <label>Request made by</label>
              <img src={request_author.profile_picture}></img>
              <div className="profile-info">
                <p>{request_author.first_name}</p>
                <div id="profile-rating">
                  {this.renderRating(request_author)}
                </div>
              </div>
            </div>
            <div id="confirmation-size">
              <label>Size of Request</label>
              <p>{getSizeEstimate(this.props.confirmation.selectedPost)}</p>
            </div>
          </div>
          <div id="confirmation-actions">
            <button id="cancel-action" onClick={this.props.closeModal}>
              Cancel
            </button>
            <button
              id="accept-action"
              onClick={() =>
                this.props.acceptPost(this.props.confirmation.selectedPost)
              }
            >
              Confirm
            </button>
          </div>
        </Modal>
      );
    } else {
      return <></>;
    }
  }
}

export default PostModal;
