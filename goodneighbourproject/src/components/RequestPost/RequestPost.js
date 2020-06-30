import React from "react";
import RequestPostView from "./RequestPostView";
import RequestPostEdit from "./RequestPostEdit";

import "../../stylesheets/RequestTimeline/requestpost.css";

class RequestPost extends React.Component {
  state = { postUser: null, editState: false };

  componentDidMount() {
    for (let i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].id === this.props.post.author) {
        this.setState({ postUser: this.props.users[i] });
        break;
      }
    }
  }

  componentDidUpdate() {
    for (let i = 0; i < this.props.users.length; i++) {
      if (this.props.users[i].id === this.props.post.author) {
        if (
          this.state.postUser &&
          this.props.users[i].id !== this.state.postUser.id
        ) {
          this.setState({ postUser: this.props.users[i] });
        }
        break;
      }
    }
  }

  handleEditClick = () => {
    this.setState({ editState: true });
  };

  handleExitEdit = () => {
    this.setState({ editState: false });
  };

  handleEditPost = (id, post) => {
    this.handleExitEdit();
    this.props.editPost(this.props.database, id, post);
  };

  renderItems = () => {
    return this.props.post.items.map((item) => {
      return <li className="request-item">{item}</li>;
    });
  };

  render() {
    if (this.state.postUser !== null) {
      if (!this.state.editState) {
        return (
          <RequestPostView
            showConfirmation={this.props.showConfirmation}
            deletePost={this.props.deletePost}
            renderItems={this.renderItems}
            editClick={this.handleEditClick}
            currentUser={this.props.currentUser}
            post={this.props.post}
            postUser={this.state.postUser}
            database={this.props.database}
          />
        );
      } else {
        return (
          <RequestPostEdit
            editPost={this.handleEditPost}
            exitEdit={this.handleExitEdit}
            currentUser={this.props.currentUser}
            post={this.props.post}
            postUser={this.state.postUser}
            database={this.props.database}
          />
        );
      }
    } else {
      return <></>;
    }
  }
}

export default RequestPost;
