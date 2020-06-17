import React from "react";

import "./requestContainer.css";
import RequestAsk from "../RequestAsk/RequestAsk";
import RequestPost from "../RequestPost/RequestPost";


const RequestContainer = () => {

  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <div
      className="container">
      placeholder
      <RequestAsk />

      {posts.map((post, index) =>
        <RequestPost key={index} id={post.id} />)}


    </div>
  );
}

export default RequestContainer;
