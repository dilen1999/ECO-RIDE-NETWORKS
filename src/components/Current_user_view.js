import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Current_user_map from "./Current_user_map";
import "../components/QrCodeGenerator.css";
import "../components/Current_user_view.css";

function Current_user_view({ handleQrWindowClose, selectedUser }) {
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [ridePath, setRidePath] = useState([]);

  const fetchRideDetails = async () => {
    try {
      if (!selectedUser || !selectedUser.rideId) {
        setError("Selected user or ride ID is missing");
        setLoading(false);
        return;
      }

      // Fetch ride details
      const rideResult = await axios.get(`https://backend-host-9thd.onrender.com/api/v1/ride/${selectedUser.rideId}`);
      console.log("Ride details:", rideResult.data);
      setRideDetails(rideResult.data);

      // Fetch current location path
      const pathResult = await axios.get(`https://backend-host-9thd.onrender.com/api/v1/ride/${selectedUser.rideId}/currentLocation`);
      console.log("Ride path:", pathResult.data);
      setRidePath(pathResult.data);

    } catch (error) {
      console.error("Error loading ride details:", error);
      setError("Failed to load ride details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser && selectedUser.rideId) {
      setLoading(true);
      fetchRideDetails();
    } else {
      setLoading(false);
    }
  }, [selectedUser]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  if (!rideDetails) {
    return <div>No ride details available</div>; // Handle no data
  }

  return (
    <div className="qrcode__container">
      <div className="closeQrWindow">
        <FontAwesomeIcon onClick={handleQrWindowClose} icon={faClose} />
      </div>
      <h1 style={{ textAlign: "center" }}>Ride Details</h1>
      <div className="border_currentuser">
        <div className="column">
          {/* Pass selectedUser.rideId as a prop */}
          <Current_user_map rideId={selectedUser.rideId} />
        </div>
        <div className="column">
          <ul>
            <li className="user-detail">
              <div>Ride ID: {rideDetails.rideId}</div>
            </li>
            {/* <li className="user-detail">
              <div>In Ride: {rideDetails.inRide ? "Yes" : "No"}</div>
            </li> */}
            <li className="user-detail">
              <div>Start Time: {rideDetails.startTime}</div>
            </li>
            {/* <li className="user-detail">
              <div>End Time: {rideDetails.endTime}</div>
            </li>
            <li className="user-detail">
              <div>Plans: {rideDetails.plans}</div>
            </li> */}
            {/* <li className="user-detail">
              <div>Estimated Amount: {rideDetails.estimatedAmount}</div>
            </li>
            <li className="user-detail">
              <div>Payment Date: {rideDetails.paymentDate}</div>
            </li> */}
            <li className="user-detail">
              <div>Bike ID: {rideDetails.bikeId}</div>
            </li>
            <li className="user-detail">
              <div>User ID: {rideDetails.userId}</div>
            </li>
            <li className="user-detail">
              <div>Start Station: {rideDetails.startStation}</div>
            </li>
            <li className="user-detail">
              <div>End Station: {rideDetails.endStation}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Current_user_view;
