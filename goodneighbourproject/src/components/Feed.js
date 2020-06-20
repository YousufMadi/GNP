import React from "react";
import Sidebar from "./Sidebar";

import "../stylesheets/feed.css";
import RequestTimeline from "./RequestTimeline/RequestTimeline";

class Feed extends React.Component {
  render() {
    return (
      <>
        <Sidebar />
        <RequestTimeline />

      </>
    );
  }
}

export default Feed;
