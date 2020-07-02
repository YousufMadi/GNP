import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";
import PostModal from "./PostModal";
import Sidebar from "../Sidebar/Sidebar";

import { updateUser } from "../../actions/user";

import { filterPosts, deletePost } from "../../actions/timeline";

class RequestTimeline extends React.Component {
  constructor(props) {
    super(props);
    /*

    ------- State Initialization ----------
    
      highlightedPost: This state manages the post to currently highlight within the maps inside the sidebar.
      posts: This state holds the posts lists passed down from the parent component.
      confirmationModal: This state manages whether to display the confirmation modal and is responsible for 
                         passing the post information down to the modal itself.
      currentPage: This state manages the page the current user is viewing, default is set to 1.
      postsPerPage: This state contains the amount of posts per page, default is set to 5.
    
    */
    this.state = {
      highlightedPost: null,
      posts: this.props.posts_state.posts,
      confirmationModal: {
        display: false,
        selectedPost: null,
      },
      currentPage: 1,
      postsPerPage: 5,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /* Function responsible for returning the filtered posts */
  filterPosts() {
    return filterPosts(
      this.props.posts_state.posts,
      this.props.posts_state,
      this.props.users_state.currentUserLocation
    );
  }

  /* This function manages the changes regarding the highlighted post within the map. 
     If a new post is clicked on, it sets that post as the highlighted post in the map. */
  handleHighlightedPostChange = (post) => {
    this.setState({ highlightedPost: post });
  };

  /* Upon clicking accept request, this function manages displaying the modal by changing the confirmation state. */
  handleConfirmationModal = (post) => {
    this.setState({ confirmationModal: { display: true, selectedPost: post } });
  };

  /* This function handles if the confirmation modal needs to be closed. */
  handleCloseModal = () => {
    this.setState({
      confirmationModal: { display: false, selectedPost: null },
    });
  };

  /* Upon confirming, this function is responsible for updating the current users active story attribute
     so that they cannot view the feed, as long as this request is active. 
     
     The request does not get deleted from the list upon accepting currently because our requests are hardcoded
     in the Feed.js component. When the user state changes, the App component rerenders since users is hardcoded
     in App.js. Therefore, the default posts get recreated once Feed rerenders due to it being a child of App.

     This function will require database calls in later phases which will fix our current deleting issue. */
  handleAcceptPost = (post) => {
    this.handleCloseModal();
    const updated_user = {
      ...this.props.users_state.currentUser,
      active_post: post,
    };

    deletePost(this.props.posts_state, post.id);
    updateUser(this.props.users_state, updated_user);
  };

  /* This function handles the changing of the page */
  handlePageClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  /* If the request list empty due to no requests or filter being to strict,
     this function is responsible for rendering an empty message instead. */
  renderEmptyMessage() {
    return (
      <div className="empty-message">
        No requests exist or match your filter.
      </div>
    );
  }

  /* 

  ------- Render function ----------

    This render function renders the correct number of posts depending on the filter state, and 
    the current page state. 

    It renders the Sidebar, followed by the RequestAsk component, and then it maps through the
    correct number posts, and renders the RequestPost component for each post.

    It is also responsible for rendering the PostModal given the state of confirmation.

  */
  render() {
    if (this.state.posts != null) {
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
            highlightPost={this.handleHighlightedPostChange}
            showConfirmation={this.handleConfirmationModal}
            currentUser={this.props.users_state.currentUser}
            users_state={this.props.users_state}
            key={index}
            post={post}
            posts_state={this.props.posts_state}
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
          <li key={number} id={number} onClick={this.handlePageClick}>
            {number}
          </li>
        );
      });
      return (
        <>
          <Sidebar
            resetFeedSelectedPost={this.handleHighlightedPostChange}
            highlightedPost={this.state.highlightedPost}
            active_post={false}
            posts={filteredPosts}
            users_state={this.props.users_state}
            changeFilterState={this.props.changeFilterState}
          />
          <div className="timeline">
            <RequestAsk
              currentUser={this.props.users_state.currentUser}
              posts_state={this.props.posts_state}
            />
            {currentPosts.length === 0 ? (
              this.renderEmptyMessage()
            ) : (
              <>
                <ul className="posts">{renderPosts}</ul>
                <ul id="page-numbers">{renderPageNumbers}</ul>
              </>
            )}
          </div>
          <PostModal
            users={this.props.users_state.users}
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
