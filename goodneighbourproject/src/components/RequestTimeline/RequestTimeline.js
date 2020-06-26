import React from "react";

import "../../stylesheets/RequestTimeline/requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";
import RequestAsk from "../RequestAsk/RequestAsk";

class RequestTimeline extends React.Component {
  state = {
    posts: [
      {
        id: 1,
        name: "Yousuf",
        reimbursement: "Cash",
        items: ["Chips", "Apples", "Flour"],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        name: "Adham",
        reimbursement: "Cheque",
        items: [],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 3,
        name: "Omar",
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 4,
        name: "Donia",
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5, 6, 7, 8],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        name: "Adham",
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        name: "Adham",
        reimbursement: "Cheque",
        items: [1, 2, 3],
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed dignissimos esse fuga! Minus, alias.",
      },
      {
        id: 2,
        name: "Adham",
        reimbursement: "Cheque",
        items: [1, 2, 3, 4],
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
        <RequestAsk addPostToTimeline={this.addPostToState} />

        <div className="posts">
          {this.state.posts.map((post, index) => (
            <RequestPost key={index} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

export default RequestTimeline;
