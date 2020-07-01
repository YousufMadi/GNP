import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const locations = [
  { name: "UTSG", lat: 43.65107, lng: -79.347015 },
  { name: "UTM", lat: 43.542331164, lng: -79.657997368 },
];

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
      <Marker
        key={post.id}
        position={{ lat: post.location.lat, lng: post.location.lng }}
        onClick={() => {
          this.setSelectedRequest(post.location);
        }}
      >
        {this.state.selectedRequest ? (
          <InfoWindow onCloseClick={() => this.setSelectedRequest(null)}>
            <div>{this.state.selectedRequest.name}</div>
          </InfoWindow>
        ) : null}
      </Marker>
    ));
  }
  render() {
    return (
      <GoogleMap
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
