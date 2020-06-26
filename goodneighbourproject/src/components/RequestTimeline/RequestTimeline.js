import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";

class RequestTimeline extends React.Component {
  state = {
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
  };

  addPostToState = (post) => {
    console.log(post);
    this.setState({ posts: [...this.state.posts, post] });
  };

  render() {
    return (
      <div className="timeline">
        <RequestAsk
          currentUser={this.props.currentUser}
          addPostToTimeline={this.addPostToState}
        />

        <div className="posts">
          {this.state.posts.map((post, index) => (
            <RequestPost users={this.props.users} key={index} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default RequestTimeline;
