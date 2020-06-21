import React from "react";

import "./requestContainer.css";
import RequestAsk from "../RequestAsk/RequestAsk";
import RequestPost from "../RequestPost/RequestPost";
import { Container } from "reactstrap";


const RequestContainer = () => {

  const posts = [{ id: 1, name: "Yousuf", size: "Small", reimbursement: "Cash", items: ["Chips", "Apples", "Flour"] },
  { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" },
  { id: 3, name: "Omar", size: "Large", reimbursement: "cheque" },
  { id: 4, name: "Donia", size: "Large", reimbursement: "cheque" },
  { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" },
  { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" },
  { id: 2, name: "Adham", size: "Large", reimbursement: "cheque" }];

  return (
    <Container
      className="timeline">
      <RequestAsk />

      <div className="posts">
        {posts.map((post, index) =>
          <RequestPost key={index} id={post.id} name={post.name} size={post.size} reimbursement={post.reimbursement} />)}
      </div>

    </Container>
  );
}

export default RequestContainer;
