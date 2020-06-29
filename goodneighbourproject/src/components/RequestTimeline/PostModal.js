import React from "react";
import Modal from "react-modal";
import "../../stylesheets/RequestTimeline/postmodal.css";

class PostModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.confirmation.display ? false : false}
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
          <p>Are you sure you want to accept this post?</p>
        </div>
        <div id="confirmation-actions">
          <button id="accept-action">Accept</button>
          <button id="cancel-action">Cancel</button>
        </div>
      </Modal>
    );
  }
}

export default PostModal;
