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
        display: true,
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

  handleEditPost = (id, post) => {
    let newPosts = this.state.posts;
    for (let i = 0; i < newPosts.length; i++) {
      if (newPosts[i].id === id) {
        newPosts[i].description = post.description;
        newPosts[i].items = post.items;
        newPosts[i].reimbursement = post.reimbursement;
        break;
      }
    }
    this.setState({ posts: newPosts });
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
            deletePost={this.props.deletePost}
            editPost={this.handleEditPost}
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
          <PostModal confirmation={this.state.confirmationModal} />
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default RequestTimeline;
