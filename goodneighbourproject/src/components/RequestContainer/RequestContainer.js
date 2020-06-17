import React from "react";

import "./requestContainer.css";
import RequestAsk from "../RequestAsk/RequestAsk";
import RequestPost from "../RequestPost/RequestPost";


class RequestContainer extends React.Component {
  render() {
    return (
      <div
        className="container">
        placeholder
        <RequestAsk />
        <RequestPost />

      </div>
    );
  }
}

export default RequestContainer;
