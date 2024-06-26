import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "../components/QrCodeGenerator.css";
import "../components/Current_user_view.css";
import Current_user_map from "./Current_user_map.js";

function User_view({ handleQrWindowClose, selectedUser }) {
  const [currentUserData, setCurrentUserData] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await axios.get(`http://localhost:8095/api/v1/user/${selectedUser.userId}`); // Ensure correct endpoint
        setCurrentUserData(result.data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    if (selectedUser && selectedUser.userId) {
      fetchUserData();
    }
  }, [selectedUser]);

  return (
    <div className="qrcode__container">
      <div className="closeQrWindow">
        <FontAwesomeIcon onClick={handleQrWindowClose} icon={faClose} />
      </div>
      <h1 style={{ textAlign: "center" }}>User Details</h1>
      <div className="border_currentuser">
        <div className="column">
          <Current_user_map />
        </div>
        <div className="column">
          {currentUserData ? (
            <ul>
              <li className="user-detail">
                <div>User ID: {currentUserData.userId}</div>
              </li>
              <li className="user-detail">
                <div>First Name: {currentUserData.firstName}</div>
              </li>
              <li className="user-detail">
                <div>Last Name: {currentUserData.lastName}</div>
              </li>
              <li className="user-detail">
                <div>Email: {currentUserData.email}</div>
              </li>
              <li className="user-detail">
                <div>Mobile: {currentUserData.mobile}</div>
              </li>
              {/* <li className="user-detail">
                <div>Registered Time: {new Date(currentUserData.registrationTime).toLocaleString()}</div>
              </li> */}
            </ul>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default User_view;
