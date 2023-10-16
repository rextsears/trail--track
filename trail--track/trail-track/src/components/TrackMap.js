import React from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import '../styles/map.css';

const libraries = ['places'];

function TrackMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBIlG3Tc-8JSLTiWy8MLL8Gnipsa1PYfhc" libraries={libraries}>
      <GoogleMap
        className="map"
        center={{
          lat: 35.3019,
          lng: -80.9436,
        }}
        zoom={10}
      >
        <Marker
          position={{
            lat: 35.3019,
            lng: -80.9436,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default TrackMap;
