import React from "react";

import "./requestContainer.css";
import RequestAsk from "../RequestAsk/RequestAsk";
import RequestPost from "../RequestPost/RequestPost";


const RequestContainer = () => {

  const posts = [{ id: 1, name: "Yousuf", size: "Small", reimbursement: "Cash" },
  { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" }];

  return (
    <div
      className="container">
      placeholder
      <RequestAsk />

      {posts.map((post, index) =>
        <RequestPost key={index} id={post.id} name={post.name} size={post.size} reimbursement={post.reimbursement} />)}


    </div>
  );
}

export default RequestContainer;
