import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Circle,
  DirectionsRenderer,
} from "react-google-maps";

class Map extends React.Component {
  /*

  ------- State Initialization ----------
    
    previousLocation: This state holds the previously selected location by the user so that the
                      map stays on its current position upon rerender.
    mapSelectedPost: This state holds the selected request by the user using the map.
    activeRequest: This state holds the request that is currently active for the user. 
    
  */
  state = {
    directions: null,
    previousLocation: null,
    mapSelectedPost: null,
    activeRequest: this.props.active_post ? this.props.posts[0] : null,
  };
  componentDidMount() {
    if (this.state.activeRequest && this.props.currentUserLocation) {
      this.setDirections();
    }
  }

  componentDidUpdate(prevState) {
    console.log(prevState);
    if (
      this.state.activeRequest &&
      this.props.currentUserLocation &&
      prevState.currentUserLocation === null
    ) {
      this.setDirections();
    }
  }

  setDirections() {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = {
      lat: this.props.currentUserLocation.latitude,
      lng: this.props.currentUserLocation.longitude,
    };
    const destination = this.state.activeRequest.location;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  /* This function is responsible for changing the mapSelectedPost state when the user clicks on a circle within the Map */
  setSelectedRequest(post) {
    const previousLocation = this.props.highlightedPost
      ? this.props.highlightedPost
      : this.state.mapSelectedPost;
    this.props.resetFeedSelectedPost(null);
    this.setState({
      previousLocation: previousLocation ? previousLocation.location : null,
      mapSelectedPost: post,
    });
  }

  /* This function is responsible for determining where the default center is for the map. Precedence is determined by the if condifiton 
     Defaults to the co-ordinates of Toronto */
  setDefaultCenter() {
    if (this.state.activeRequest) {
      return this.state.activeRequest.location;
    } else if (this.props.highlightedPost) {
      return this.props.highlightedPost.location;
    } else if (this.state.mapSelectedPost) {
      return this.state.mapSelectedPost.location;
    } else if (this.state.previousLocation) {
      return this.state.previousLocation;
    } else if (this.props.currentUserLocation) {
      return {
        lat: this.props.currentUserLocation.latitude,
        lng: this.props.currentUserLocation.longitude,
      };
    } else {
      return { lat: 43.65107, lng: -79.347015 };
    }
  }

  /* This function renders the markers within the map.
     If the user has an active request, it only renders that one request with a precise marker
     otherwise it renders circles around the location of the requests currently displayed in the timeline. */
  renderLocations() {
    if (this.state.activeRequest) {
      return this.props.posts.map((post) => (
        <Marker key={post.id} position={this.state.activeRequest.location}>
          <InfoWindow>
            <div className="marker-description">
              {this.state.activeRequest.description}
            </div>
          </InfoWindow>
        </Marker>
      ));
    } else {
      return this.props.posts.map((post) => (
        <>
          <Circle
            key={post._id}
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
  }
  render() {
    // Force re-render, otherwise, markers are not changed.
    const newKey = uuidv4();
    if (this.state.activeRequest && this.state.directions) {
      return (
        <GoogleMap
          key={newKey}
          defaultCenter={this.setDefaultCenter()}
          defaultZoom={10}
        >
          <DirectionsRenderer directions={this.state.directions} />
        </GoogleMap>
      );
    } else {
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
}

export default withScriptjs(withGoogleMap(Map));
