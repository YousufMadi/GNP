import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";

class RequestTimeline extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [
      {
        id: 1,
        reimbursement: "Cash",
        items: ["Chips", "Apples", "Flour"],
        author: 1,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        reimbursement: "Cheque",
        items: ["Honey Nut Cheerios"],
        author: 2,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 3,
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5],
        author: 0,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 4,
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5, 6, 7, 8],
        author: 2,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        author: 0,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        reimbursement: "Cheque",
        items: [1, 2, 3],
        author: 1,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        reimbursement: "Cheque",
        items: [1, 2, 3, 4],
        author: 1,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
    ],
      currentPage: 1,
      postsPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { posts, currentPage, postsPerPage } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const renderPosts = currentPosts.map((post, index) => {
      return <RequestPost users={this.props.users} key={index} post={post} />
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div className="timeline">
        <RequestAsk
          currentUser={this.props.currentUser}
          addPostToTimeline={this.addPostToState}
        />
        <ul className="posts">
          {renderPosts}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

export default RequestTimeline;
