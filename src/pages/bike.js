import React, { useEffect, useState } from "react";
import { faBell, faBicycle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Bike.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Addbike from "../components/Addbike";
import Bikes_view from "../components/Bikes_view";

function Bike() {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentbikeClicked, setcurrentbikeClicked] = useState(true);
  const [addbikeClicked, setaddbikeClicked] = useState(false);
  const [totalBikes, setTotalBikes] = useState(0);
  const [todayDate, setTodayDate] = useState("");
  const [totalOnRideUsers, settotalOnRideUsers] = useState([]);
  const [bikesinStation, setBikesinStation] = useState([]);
  const [allRides, setAllRides] = useState([]);
  const [bikeView, setBikeView] = useState(false); // Correct initial state
  const [selectedBike, setSelectedBike] = useState(null);

  useEffect(() => {
    loadBikes();
    setTodayDate(getFormattedDate(new Date()));
    TotalOnRideUsersfun();
    AllBikesinstations();
    AllRidebikes();
  }, []);

  // Function to format date as "DD MonthName YYYY"
  const getFormattedDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const loadBikes = async () => {
    try {
      const result = await axios.get("http://localhost:8095/api/v1/Bikes");
      console.log("Result data:", result.data);
      setTotalBikes(result.data.length);
      setBikes(result.data);
    } catch (error) {
      console.error("Error loading bikes:", error);
      alert("Failed to load bikes. Please try again later.");
    }
  };

  const deleteBikes = async (bike_id) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      try {
        await axios.delete(`http://localhost:8095/api/v1/Bikes/${bike_id}`);
        loadBikes();
      } catch (error) {
        console.error("Error deleting bike:", error);
        alert("Failed to delete bike. Please try again later.");
      }
    }
  };

  const TotalOnRideUsersfun = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/user/totalonRideUsers"
      );
      settotalOnRideUsers(result.data);
    } catch (error) {
      console.error("Error fetching total on-ride users:", error);
      alert("Failed to fetch total on-ride users. Please try again later.");
    }
  };

  const AllBikesinstations = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/total-available-bikes"
      );
      setBikesinStation(result.data);
    } catch (error) {
      console.error("Error fetching bikes in stations:", error);
      alert("Failed to fetch bikes in stations. Please try again later.");
    }
  };

  const AllRidebikes = async () => {
    try {
      const result = await axios.get("http://localhost:8095/api/v1/ride/total");
      setAllRides(result.data);
    } catch (error) {
      console.error("Error fetching all ride bikes:", error);
      alert("Failed to fetch all ride bikes. Please try again later.");
    }
  };

  return (
    <div style={{ width: "100%" }} className="column">
      <div className="Dashboard">
        <div className="dashboardRow">
          <span>Dashboard{">"}</span>
          <span> Bike </span>
        </div>
      </div>

      <div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="StaionDetailsBoxuser"
              style={{ marginLeft: "70px" }}
            >
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p className="text">Total bikes</p>
                  <p
                    className="text"
                    style={{ marginLeft: "100px", fontSize: "14px" }}
                  >
                    {todayDate}
                  </p>
                </div>

                <p className="numberuser1">{totalBikes}</p>
              </div>
            </div>
            <div className="StaionDetailsBoxuser">
              <p className="text">Total bikes in stations</p>
              <p className="numberuser">{bikesinStation}</p>
            </div>
            <div className="StaionDetailsBoxuser">
              <p className="text">On-Ride bikes</p>
              <p className="numberuser">{totalOnRideUsers}</p>
            </div>
            <div className="StaionDetailsBoxuser">
              <p className="text">Total ride</p>
              <p className="numberuser">{allRides}</p>
            </div>
          </div>
        </div>
      </div>

      {currentbikeClicked && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="current_User">Bikes</div>
            <Link
              className="addbikebutton"
              to=""
              onClick={() => {
                setcurrentbikeClicked(false);
                setaddbikeClicked(true);
              }}
            >
              +Add bike
            </Link>

            <div
              className="bike-Search_User"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                style={{
                  border: "none",
                  outline: "none",
                  width: "7vw",
                  height: "2vh",
                }}
              ></input>
            </div>
          </div>
          <div className="table-container">
            <table className="bike-table">
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">ID</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Model</th>
                  <th scope="col">Bike code no</th>
                  <th scope="col">Last maintenance date</th>
                  <th scope="col">On ride?</th>
                  <th scope="col">Current user</th>
                  <th scope="col">Current location</th>
                  <th scope="col">Color</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {bikes
                  .filter((Bike) => {
                    return search.toLowerCase() === ""
                      ? Bike
                      : Bike.brand.toLowerCase().includes(search);
                  })
                  .map((Bike, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Bike.bikeId}</td>
                      <td>
                        <div>
                          <FontAwesomeIcon
                            icon={faBicycle}
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                      </td>
                      <td>{Bike.brand}</td>
                      <td>{Bike.bikeModel}</td>
                      <td>{Bike.bikeCode}</td>
                      <td>{Bike.lastMaintenanceDate}</td>
                      <td>{Bike.onRide ? "Yes" : "No"}</td>
                      <td>None</td>
                      <td>Galle</td>
                      <td>{Bike.color}</td>

                      <td>
                        <div className="dropdown">
                          <button className="dropbtn">
                            Action <span className="arrow">&#9658;</span>
                          </button>
                          <div className="dropdown-content">
                            <button
                              className="action-button"
                              onClick={() => {
                                setBikeView(true); // Correct state update
                                setSelectedBike(Bike); // Set the selected bike
                              }}
                            >
                              View
                            </button>
                            <button className="action-button">
                              View location
                            </button>
                            <button
                              className="action-button"
                              onClick={() => {
                                deleteBikes(Bike.bikeId);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {bikeView && selectedBike && (
              <div className="QrWindow">
                <Bikes_view
                  handleQrWindowClose={() => setBikeView(false)} // Corrected to close the view
                  selectedBike={selectedBike} // Corrected prop name
                />
              </div>
            )}
          </div>
        </div>
      )}

      {addbikeClicked && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Addbike />
          </div>
        </div>
      )}
    </div>
  );
}

export default Bike;
