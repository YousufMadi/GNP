import React from "react";

import "./requestTimeline.css";
import RequestPost from "../RequestPost/RequestPost";

class RequestTimeline extends React.Component {

  state = {
    posts:
      [{ id: 1, name: "Yousuf", size: "Small", reimbursement: "Cash", items: ["Chips", "Apples", "Flour"] },
      { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" },
      { id: 3, name: "Omar", size: "Large", reimbursement: "cheque" },
      { id: 4, name: "Donia", size: "Large", reimbursement: "cheque" },
      { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" },
      { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" },
      { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" }]
  }

  render() {
    return (
        <div className="timeline">
          {/*<RequestAsk />*/}

          <div className="posts">
            {this.state.posts.map((post, index) =>
              <RequestPost key={index} id={post.id} name={post.name} size={post.size} reimbursement={post.reimbursement} />)}
          </div>

        </div>
    );
  }
}

export default RequestTimeline;
