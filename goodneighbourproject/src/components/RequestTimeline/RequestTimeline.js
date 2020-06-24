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
      },
      { id: 2, name: "Adham", reimbursement: "Cheque", items: [] },
      { id: 3, name: "Omar", reimbursement: "Cheque", items: [1, 2, 3, 4, 5] },
      {
        id: 4,
        name: "Donia",
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: 2,
        name: "Adham",
        reimbursement: "Cheque",
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      { id: 2, name: "Adham", reimbursement: "Cheque", items: [1, 2, 3] },
      { id: 2, name: "Adham", reimbursement: "Cheque", items: [1, 2, 3, 4] },
    ],
  };

  addPostToState = (post) => {
    this.setState({ posts: [...this.state.posts, post] });
  };

  render() {
    return (
      <div className="timeline">
        <RequestAsk addPostToTimeline={this.addPostToState} />

        <div className="posts">
          {this.state.posts.map((post, index) => (
            <RequestPost
              key={index}
              id={post.id}
              name={post.name}
              reimbursement={post.reimbursement}
              items={post.items}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RequestTimeline;
