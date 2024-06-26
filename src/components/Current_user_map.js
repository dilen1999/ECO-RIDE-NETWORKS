import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from '@peacechen/google-maps-react';
import axios from "axios";

const Current_user_map = ({ google, rideId }) => {
  const [rideLocation, setRideLocation] = useState(null);

  const fetchCurrentLocation = async () => {
    try {
      const response = await axios.get(`http://localhost:8095/api/v1/ride/${rideId}/currentLocation`);
      setRideLocation(response.data);
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };

  useEffect(() => {
    if (rideId) {
      fetchCurrentLocation();
    }
  }, [rideId]);

  return (
    <div>
      <Map
        google={google}
        style={{ width: "35.7%", height: "55%" }}
        zoom={15}
        initialCenter={{
          lat: rideLocation ? rideLocation.latitude : 6.047170, // Fallback value
          lng: rideLocation ? rideLocation.longitude : 80.210091 // Fallback value
        }}
        center={{
          lat: rideLocation ? rideLocation.latitude : 6.047170, // Update center dynamically
          lng: rideLocation ? rideLocation.longitude : 80.210091 // Update center dynamically
        }}
      >
        {rideLocation && (
          <Marker
            position={{ lat: rideLocation.latitude, lng: rideLocation.longitude }}
            title={`Current Location: Latitude: ${rideLocation.latitude}, Longitude: ${rideLocation.longitude}, Timestamp: ${rideLocation.timestamp}`}
          />
        )}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBRIOBv7RD1nfT3AkqPOtyJ0z7pHt68Ic0",
})(Current_user_map);
