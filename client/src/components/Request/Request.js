import React from "react";
import ViewRequest from "./ViewRequest";
import EditRequest from "./EditRequest";
import { connect } from "react-redux";
import "../../stylesheets/request.css";

import { editPost } from "../../actions/timeline";

class Request extends React.Component {
  /*

  ------- State Initialization ----------

    postUser: This stores the author of the post passed down by the parent component
    editState: This state manages whether the user is in an edit state or view state for this post.

  */
  state = { postUser: this.props.post.author, editState: false };

  /* Update lifecycle method that is required to update the postUser state if the post passed down changes. */
  componentDidUpdate() {
    if (
      this.state.postUser &&
      this.props.post.author &&
      this.props.post.author._id !== this.state.postUser._id
    ) {
      this.setState({ postUser: this.props.post.author });
    }
  }
  /* This function manages the change from View state -> Edit State. */
  handleEditClick = () => {
    this.setState({ editState: true });
  };

  /* This function manages the change from Edit state -> View State. */
  handleExitEdit = () => {
    this.setState({ editState: false });
  };

  /* This function is responsible for saving the user's edit. 

     This will require a database call in later phases. */
  handleEditPost = (id, post) => {
    this.handleExitEdit();
    this.props.editPost(id, post, this.props.currentUser._id);
  };

  /* This function is responsible for rendering the items as an li in the items
     prop passed down from the parent component. */
  renderItems = () => {
    return this.props.post.items.map((item) => {
      return (
        <li key={item._id} className="request-item">
          {item.name}
        </li>
      );
    });
  };

  /* 

  ------- Render function ----------

    Given the current state of editState, if it is true, render the Edit component
    otherwise render the view component. 

  */
  render() {
    if (this.state.postUser !== null) {
      if (!this.state.editState) {
        return (
          <ViewRequest
            highlightPost={this.props.highlightPost}
            showConfirmation={this.props.showConfirmation}
            renderItems={this.renderItems}
            editClick={this.handleEditClick}
            post={this.props.post}
            postUser={this.state.postUser}
          />
        );
      } else {
        return (
          <EditRequest
            editPost={this.handleEditPost}
            exitEdit={this.handleExitEdit}
            post={this.props.post}
            postUser={this.state.postUser}
          />
        );
      }
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

export default connect(mapStateToProps, { editPost })(Request);
