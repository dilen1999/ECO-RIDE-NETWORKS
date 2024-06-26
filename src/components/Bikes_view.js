import React, { useState, useEffect, useRef } from "react";
import * as htmlToImage from "html-to-image";
import "../components/QrCodeGenerator.css";
import "../components/Current_user_view.css";
import QRCode from "react-qr-code";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle, faClose } from "@fortawesome/free-solid-svg-icons";
import Current_user_map from "./Current_user_map.js";

function Bikes_view({ handleQrWindowClose, selectedBike }) {
  const [currentBikeData, setcurrentBikeData] = useState([]);

  const currentBikeDatafun = async () => {
    if (!selectedBike || !selectedBike.bikeId) {
      console.error("selectedBike or bike_id is undefined");
      return;
    }

    console.log("Fetching data for Bike_id:", selectedBike.bikeId); // Log Bike_id

    try {
      const result = await axios.get(
        `http://localhost:8095/api/v1/Bikes/${selectedBike.bikeId}`
      );
      console.log("Result data:", result.data);
      setcurrentBikeData([result.data]); // Wrap in array to map over it
    } catch (error) {
      console.error("Error loading bike data:", error);
      console.error("Error response data:", error.response?.data); // Add this log
    }
  };

  useEffect(() => {
    if (selectedBike) {
      currentBikeDatafun();
    }
  }, [selectedBike]);

  return (
    <div className="qrcode__container">
      <div className="closeQrWindow">
        <FontAwesomeIcon onClick={handleQrWindowClose} icon={faClose} />
      </div>
      <h1 style={{ textAlign: "center" }}>Bike Details</h1>
      <div className="border_currentuser">
        <div className="column">
          {" "}
          <FontAwesomeIcon icon={faBicycle} className="Bikeicon" style={{ marginRight: "5px" }} />
        </div>

        <div className="column">
          <ul>
            {currentBikeData.map((Bike) => (
              <div>
                <li className="user-detailbike">
                  <div>Bike ID: {Bike.bikeId}</div>
                </li>
                <li className="user-detailbike">
                  <div>Code: {Bike.bikeCode}</div>
                </li>
                <li className="user-detailbike">
                  <div>Model: {Bike.bikeModel}</div>
                </li>
                <li className="user-detailbike">
                  <div>Brand: {Bike.brand}</div>
                </li>
                <li className="user-detailbike">
                  <div>Color: {Bike.color}</div>
                </li>
                {/* <li className="user-detailbike">
                  <div>Initial Station: {Bike.station}</div>
                </li> */}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Bikes_view;
