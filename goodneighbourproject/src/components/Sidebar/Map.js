import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = () => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 43.65107, lng: -79.347015 }}
    />
  );
};

export default withScriptjs(withGoogleMap(Map));
