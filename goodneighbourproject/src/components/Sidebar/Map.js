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
    selectedRequest: this.props.active_post
      ? this.props.posts[0].location
      : null,
    mapPosition: this.props.active_post
      ? this.props.posts[0].location
      : { lat: 43.65107, lng: -79.347015 },
  };

  setSelectedRequest(location) {
    this.setState({ selectedRequest: location });
  }

  renderLocations() {
    return this.props.posts.map((post) => (
      <>
        <Circle
          key={post.id}
          radius={2000}
          center={{ lat: post.location.lat, lng: post.location.lng }}
          onClick={() => {
            this.setSelectedRequest(post.location);
          }}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={1}
          fillColor="#FFFFFF"
          fillOpacity={0.2}
        ></Circle>
        {this.state.selectedRequest &&
        post.location.lat === this.state.selectedRequest.lat &&
        post.location.lng === this.state.selectedRequest.lng ? (
          <InfoWindow
            position={this.state.selectedRequest}
            onCloseClick={() => this.setSelectedRequest(null)}
          >
            <div>{this.state.selectedRequest.name}</div>
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
        defaultCenter={{
          lat: this.state.mapPosition.lat,
          lng: this.state.mapPosition.lng,
        }}
      >
        {this.renderLocations()}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
