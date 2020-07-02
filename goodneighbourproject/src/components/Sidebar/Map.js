import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Circle,
} from "react-google-maps";

class Map extends React.Component {
  state = {
    mapSelectedPost: null,
    activeRequest: this.props.active_post ? this.props.posts[0] : null,
  };

  setSelectedRequest(post) {
    this.props.resetFeedSelectedPost(null);
    this.setState({ mapSelectedPost: post });
  }

  setDefaultCenter() {
    if (this.state.activeRequest) {
      return this.state.activeRequest.location;
    } else if (this.props.highlightedPost) {
      return this.props.highlightedPost.location;
    } else if (this.state.mapSelectedPost) {
      return this.state.mapSelectedPost.location;
    } else {
      return { lat: 43.65107, lng: -79.347015 };
    }
  }

  setInfoMarkerLocation() {}

  renderLocations() {
    return this.props.posts.map((post) => (
      <>
        <Circle
          key={post.id}
          radius={2000}
          center={{ lat: post.location.lat, lng: post.location.lng }}
          onClick={() => {
            this.setSelectedRequest(post);
          }}
          strokeColor="transparent"
          strokeOpacity={0.5}
          strokeWeight={1}
          fillColor="#FFFFFF"
          fillOpacity={0.2}
        ></Circle>
        {this.state.mapSelectedPost &&
        post.location.lat === this.state.mapSelectedPost.location.lat &&
        post.location.lng === this.state.mapSelectedPost.location.lng ? (
          <InfoWindow
            position={this.state.mapSelectedPost.location}
            onCloseClick={() => this.setSelectedRequest(null)}
          >
            <div className="marker-description">
              {this.state.mapSelectedPost.description}
            </div>
          </InfoWindow>
        ) : null}
        {this.props.highlightedPost &&
        post.location.lat === this.props.highlightedPost.location.lat &&
        post.location.lng === this.props.highlightedPost.location.lng ? (
          <InfoWindow
            position={this.props.highlightedPost.location}
            onCloseClick={() => this.setSelectedRequest(null)}
          >
            <div className="marker-description">
              {this.props.highlightedPost.description}
            </div>
          </InfoWindow>
        ) : null}
      </>
    ));
  }
  render() {
    const newKey = uuidv4();
    return (
      <GoogleMap
        key={newKey}
        defaultZoom={10}
        defaultCenter={this.setDefaultCenter()}
      >
        {this.renderLocations()}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
