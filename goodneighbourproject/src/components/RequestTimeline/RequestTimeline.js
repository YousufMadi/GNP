import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";
import PostModal from "./PostModal";

class RequestTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredPosts: null,
      posts: this.props.posts,
      confirmationModal: {
        display: false,
        selectedPost: null,
      },
      currentPage: 1,
      postsPerPage: 5,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ filteredPosts: this.state.posts });
  }

  filterPosts(posts) {
    return this.props.filterPosts(posts, this.props.filterState);
  }

  addPostToState = (post) => {
    this.props.addPostToState(this.props.database, post);
  };

  handleConfirmationModal = (post) => {
    this.setState({ confirmationModal: { display: true, selectedPost: post } });
  };

  handleCloseModal = () => {
    this.setState({
      confirmationModal: { display: false, selectedPost: null },
    });
  };

  handleAcceptPost = (post) => {
    this.handleCloseModal();
    const updated_user = {
      ...this.props.database.currentUser,
      active_post: post,
    };
    this.props.updateUser(this.props.database, updated_user);
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    if (this.state.filteredPosts != null) {
      const { posts, currentPage, postsPerPage } = this.state;
      const filteredPosts = this.filterPosts(posts);
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = filteredPosts.slice(
        indexOfFirstPost,
        indexOfLastPost
      );

      const renderPosts = currentPosts.map((post, index) => {
        return (
          <RequestPost
            showConfirmation={this.handleConfirmationModal}
            deletePost={this.props.deletePost}
            editPost={this.props.editPost}
            currentUser={this.props.database.currentUser}
            users={this.props.database.users}
            key={index}
            post={post}
            database={this.props.database}
          />
        );
      });

      const pageNumbers = [];
      for (
        let i = 1;
        i <= Math.ceil(filteredPosts.length / postsPerPage);
        i++
      ) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map((number) => {
        return (
          <li key={number} id={number} onClick={this.handleClick}>
            {number}
          </li>
        );
      });

      return (
        <>
          <div className="timeline">
            <RequestAsk
              currentUser={this.props.database.currentUser}
              addPostToTimeline={this.addPostToState}
            />
            <ul className="posts">{renderPosts}</ul>
            <ul id="page-numbers">{renderPageNumbers}</ul>
          </div>
          <PostModal
            users={this.props.database.users}
            acceptPost={this.handleAcceptPost}
            confirmation={this.state.confirmationModal}
            closeModal={this.handleCloseModal}
          />
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default RequestTimeline;
