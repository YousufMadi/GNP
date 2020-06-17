import React from "react";

import RequestTimeline from "./RequestTimeline/RequestTimeline";
import Sidebar from "./Sidebar";

import "../stylesheets/feed.css";

class Feed extends React.Component {
  render() {
    return (
      <>
      <Sidebar />
      <RequestTimeline/>
      </>
    );
  }
}

export default Feed;
