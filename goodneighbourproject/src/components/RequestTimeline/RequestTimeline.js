import React from "react";

import "./requestTimeline.css";
import RequestContainer from "../RequestContainer/RequestContainer";

class RequestTimeline extends React.Component {
  render() {
    return (
      <div
        className="rightSide">
        <RequestContainer />
      </div>
    );
  }
}

export default RequestTimeline;
