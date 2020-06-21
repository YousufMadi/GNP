import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const Map = () => {
  const locations = [
    { name: "UTSG", lat: 43.65107, lng: -79.347015 },
    { name: "UTM", lat: 43.542331164, lng: -79.657997368 },
  ];
  const [selectedRequest, setSelectedRequest] = useState(null);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 43.65107, lng: -79.347015 }}
    >
      {locations.map((location) => (
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => {
            setSelectedRequest(location);
          }}
        />
      ))}
      {selectedRequest ? (
        <InfoWindow
          position={{ lat: selectedRequest.lat, lng: selectedRequest.lng }}
          onCloseClick={() => setSelectedRequest(null)}
        >
          <div>{selectedRequest.name}</div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
