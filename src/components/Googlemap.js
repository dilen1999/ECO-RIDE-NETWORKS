import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from '@peacechen/google-maps-react';
import axios from "axios";

const MapContainer = (props) => {
  const [ridePaths, setRidePaths] = useState([]);

  // Function to fetch active ride paths from the backend
  const fetchActiveRidePaths = async () => {
    try {
      const response = await axios.get("http://localhost:8095/api/v1/ride/activeRidePaths");
      setRidePaths(response.data);
    } catch (error) {
      console.error("Error fetching active ride paths:", error);
    }
  };

  // Fetch ride paths on component mount
  useEffect(() => {
    fetchActiveRidePaths();
  }, []);

  // const cycleIcon = {
  //   url: "https://img.pngwing.com/pngs/582/77/png-transparent-bicycle-icons-pedaler-cyclist-cycling-cycling-sport-sports-equipment-thumbnail.png", // Replace with your icon URL
  //   scaledSize: new window.google.maps.Size(30, 30), 
  //   origin: new window.google.maps.Point(0, 0), 
  //   anchor: new window.google.maps.Point(15, 30) 
  // };

  return (
    <div>
      <Map
        google={props.google}
        style={{ width: "80.7%", height: "630px" }}
        zoom={15}
        initialCenter={{
          lat: 6.047170,
          lng: 80.210091,
        }}
      >
        {/* Marker for the first point */}
        {/* <Marker position={{ lat: 6.053519, lng: 80.220978 }} /> */}

        {/* Marker for the second point */}
        {/* <Marker position={{ lat: 6.034010, lng: 80.218852 }} /> */}

        {/* Marker for the second point */}
        {/* <Marker position={{ lat: 6.043047, lng: 80.197158 }} /> */}

        {/* Marker for the second point */}
        {/* <Marker position={{ lat: 6.049653, lng: 80.203943 }} /> */}
        {ridePaths.map((path, index) => (
          <Marker
            key={index}
            position={{ lat: path.latitude, lng: path.longitude }}
            title={`Ride ID: ${path.rideId}, Timestamp: ${path.timestamp}`}
           // icon={cycleIcon}
          />
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBRIOBv7RD1nfT3AkqPOtyJ0z7pHt68Ic0",
})(MapContainer);
