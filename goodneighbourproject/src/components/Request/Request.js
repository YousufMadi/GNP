import React from "react";
import ViewRequest from "./ViewRequest";
import EditRequest from "./EditRequest";

import "../../stylesheets/request.css";

import { editPost } from "../../actions/timeline";

class Request extends React.Component {
  /*

  ------- State Initialization ----------

    postUser: This stores the author of the post passed down by the parent component
    editState: This state manages whether the user is in an edit state or view state for this post.

  */
  state = { postUser: null, editState: false };

  /* Once the component is mounted, figure out who the author is for this post. 
  
     This will require a database call if the author attribute is not populated. */
  componentDidMount() {
    for (let i = 0; i < this.props.users_state.users.length; i++) {
      if (this.props.users_state.users[i].id === this.props.post.author) {
        this.setState({ postUser: this.props.users_state.users[i] });
        break;
      }
    }
  }

  /* Update lifecycle method that is required to update the postUser state if the post passed down changes. */
  componentDidUpdate() {
    for (let i = 0; i < this.props.users_state.users.length; i++) {
      if (this.props.users_state.users[i].id === this.props.post.author) {
        if (
          this.state.postUser &&
          this.props.users_state.users[i].id !== this.state.postUser.id
        ) {
          this.setState({ postUser: this.props.users_state.users[i] });
        }
        break;
      }
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
    editPost(this.props.posts_state, id, post);
  };

  /* This function is responsible for rendering the items as an li in the items
     prop passed down from the parent component. */
  renderItems = () => {
    return this.props.post.items.map((item, i) => {
      return (
        <li key={i} className="request-item">
          {item}
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
            currentUser={this.props.currentUser}
            post={this.props.post}
            postUser={this.state.postUser}
            posts_state={this.props.posts_state}
          />
        );
      } else {
        return (
          <EditRequest
            editPost={this.handleEditPost}
            exitEdit={this.handleExitEdit}
            currentUser={this.props.currentUser}
            post={this.props.post}
            postUser={this.state.postUser}
            posts_state={this.props.posts_state}
          />
        );
      }
    } else {
      return <></>;
    }
  }
}

export default Request;
