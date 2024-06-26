import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../components/Sidebar.css"; // Make sure this path is correct
import "./Home.css";
import { Flex } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MapContainer from "../components/Googlemap.js";
import Current_user_view from "../components/Current_user_view";

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
 

  const [bellClicked, setBellClicked] = useState(false);
  const [locationClicked, setLocationClicked] = useState(true);
  const [userClicked, setUserClicked] = useState(false);
  const [stationClicked, setStationClicked] = useState(false);
  const [totalBikes, setTotalBikes] = useState();
  const [bikes, setBikes] = useState([]);
  const [station, setStation] = useState([]);
  const [totalOnRideUsers, settotalOnRideUsers] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  // const [currentUsers, setCurrentUsers] = useState("");
  const [currentRides, setCurrentRides] = useState([]);

  const [totalNewUsers, settotalNewUsers] = useState([]);
  const [totalCurrentUsers, setTotalCurrentUsers] = useState(0);

  const [avlBikesST1, setAvlBikesST1] = useState([]);
  const [parkingPlaceST1, setParkingPlaceST1] = useState([]);

  const [avlBikesST2, setAvlBikesST2] = useState([]);
  const [parkingPlaceST2, setParkingPlaceST2] = useState([]);

  const [avlBikesST3, setAvlBikesST3] = useState([]);
  const [parkingPlaceST3, setParkingPlaceST3] = useState([]);

  const [avlBikesST4, setAvlBikesST4] = useState([]);
  const [parkingPlaceST4, setParkingPlaceST4] = useState([]);

  const [bikesinStation, setBikesinStation] = useState([]);
  const [bikesinMaintenance, setBikesinMaintenance] = useState([]);

  const [allRides, setAllRides] = useState([]);

  const [userView, setUserView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dataST1 = {
    datasets: [
      {
        label: "poll",
        data: [avlBikesST1, parkingPlaceST1],
        backgroundColor: ["#0BDA51", "red"],
        borderColor: ["#0BDA51", "red"],
      },
    ],
    labels: ["C. available bikes", "C. parking place"],
  };
  const dataST2 = {
    datasets: [
      {
        label: "poll",
        data: [avlBikesST2, parkingPlaceST2],
        backgroundColor: ["#0BDA51", "red"],
        borderColor: ["#0BDA51", "red"],
      },
    ],
    labels: ["C. available bikes", "C. parking place"],
  };
  const dataST3 = {
    datasets: [
      {
        label: "poll",
        data: [avlBikesST3, parkingPlaceST3],
        backgroundColor: ["#0BDA51", "red"],
        borderColor: ["#0BDA51", "red"],
      },
    ],
    labels: ["C. available bikes", "C. parking place"],
  };
  const dataST4 = {
    datasets: [
      {
        label: "poll",
        data: [avlBikesST4, parkingPlaceST4],
        backgroundColor: ["#0BDA51", "red"],
        borderColor: ["#0BDA51", "red"],
      },
    ],
    labels: ["C. available bikes", "C. parking place"],
  };

  const option = {
    plugins: {
      legend: {
        position: "center", // Change the position of the legend to 'top'
      },
    },
  };
  const loadBikes = async () => {
    try {
      const result = await axios.get("http://localhost:8095/api/v1/Bikes");
      setTotalBikes(result.data.length);
      setBikes(result.data);
    } catch (error) {
      console.error("Error loading bikes:", error);
    }
  };

  const TotalOnRideUsersfun = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/user/totalonRideUsers"
      );
      settotalOnRideUsers(result.data);
    } catch (error) {
      console.error("Error loading total on ride users:", error);
    }
  };

  const getFormattedDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // const loadUsers = async () => {
  //   try {
  //     const result = await axios.get(
  //       "http://localhost:8095/api/v1/user/inRide"
  //     );
  //     console.log("Result data:", result.data);
  //     setCurrentUsers(result.data);
  //     setTotalCurrentUsers(result.data.length);
  //   } catch (error) {
  //     console.error("Error loading users:", error);
  //   }
  // };

    // Updated API call to load rides instead of users
    const loadCurrentRides = async () => {
      try {
        const result = await axios.get("http://localhost:8095/api/v1/ride/onRide");
        setCurrentRides(result.data);
        setTotalCurrentUsers(result.data.length); // Assuming each ride is a unique user for simplicity
      } catch (error) {
        console.error("Error loading current rides:", error);
      }
    };

  const TotalNewUsersfun = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/user/totalVerifiedUsers"
      );
      settotalNewUsers(result.data);
    } catch (error) {
      console.error("Error loading total new users:", error);
    }
  };

  const ST1availableBikes = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST1/available-bikes"
      );
      setAvlBikesST1(result.data);
    } catch (error) {
      console.error("Error loading available bikes for ST1:", error);
    }
  };

  const ST1parkingPlace = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST1/available-parking-slots"
      );
      setParkingPlaceST1(result.data);
    } catch (error) {
      console.error("Error loading parking places for ST1:", error);
    }
  };

  const ST2availableBikes = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST2/available-bikes"
      );
      setAvlBikesST2(result.data);
    } catch (error) {
      console.error("Error loading available bikes for ST2:", error);
    }
  };

  const ST2parkingPlace = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST2/available-parking-slots"
      );
      setParkingPlaceST2(result.data);
    } catch (error) {
      console.error("Error loading parking places for ST2:", error);
    }
  };

  const ST3availableBikes = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST3/available-bikes"
      );
      setAvlBikesST3(result.data);
    } catch (error) {
      console.error("Error loading available bikes for ST3:", error);
    }
  };

  const ST3parkingPlace = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST3/available-parking-slots"
      );
      setParkingPlaceST3(result.data);
    } catch (error) {
      console.error("Error loading parking places for ST3:", error);
    }
  };

  const ST4availableBikes = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST4/available-bikes"
      );
      setAvlBikesST4(result.data);
    } catch (error) {
      console.error("Error loading available bikes for ST4:", error);
    }
  };

  const ST4parkingPlace = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/ST4/available-parking-slots"
      );
      setParkingPlaceST4(result.data);
    } catch (error) {
      console.error("Error loading parking places for ST4:", error);
    }
  };

  const AllBikesinstations = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/station/total-available-bikes"
      );
      setBikesinStation(result.data);
    } catch (error) {
      console.error("Error loading all bikes in stations:", error);
    }
  };

  const AllBikesinMaintenance = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/bikes/maintenance/bikes-in-maintenance-count"
      );
      setBikesinMaintenance(result.data);
    } catch (error) {
      console.error("Error loading bikes in maintenance:", error);
    }
  };

  const AllRidebikes = async () => {
    try {
      const result = await axios.get("http://localhost:8095/api/v1/ride/total");
      setAllRides(result.data);
    } catch (error) {
      console.error("Error loading all ride bikes:", error);
    }
  };

  const handleClickBell = () => {
    // Define the behavior for bell icon click
    setBellClicked(true);
    setLocationClicked(false);
    setUserClicked(false);
    setStationClicked(false);
  };

  const handleClickLocation = () => {
    // Define the behavior for location click
    setLocationClicked(true);
    setBellClicked(false);
    setUserClicked(false);
    setStationClicked(false);
  };

  const handleClickUser = () => {
    // Define the behavior for user click
    setUserClicked(true);
    setLocationClicked(false);
    setBellClicked(false);
    setStationClicked(false);
  };

  const handleClickStation = () => {
    // Define the behavior for station click
    setStationClicked(true);
    setUserClicked(false);
    setLocationClicked(false);
    setBellClicked(false);

    loadBikes();
  };

  useEffect(() => {
    TotalOnRideUsersfun();
    setTodayDate(getFormattedDate(new Date()));
    //loadUsers();
    TotalNewUsersfun();
    ST1availableBikes();
    ST1parkingPlace();
    ST2availableBikes();
    ST2parkingPlace();
    ST3availableBikes();
    ST3parkingPlace();
    ST4availableBikes();
    ST4parkingPlace();
    AllBikesinstations();
    AllBikesinMaintenance();
    AllRidebikes();
    loadCurrentRides();
  }, []);

  return (
    <div>
      <div style={{ width: "100%" }} className="column">
        <div className="Dashboard">
          <div className="dashboardRow">
            <span>Dashboard </span>
            <span>{">"}</span>
            <span> Home </span>
            <Link
              to=""
              className="Location"
              style={{
                color: bellClicked ? "black" : "grey",
                marginLeft: "75%",
              }}
              onClick={handleClickBell}
            >
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <Link
            to=""
            className="Location"
            style={{ color: locationClicked ? "black" : "grey" }}
            onClick={handleClickLocation}
          >
            <span className="Location1">Location</span>
          </Link>

          <Link
            to=""
            className="Location"
            style={{ color: stationClicked ? "black" : "grey" }}
            onClick={handleClickStation}
          >
            <span className="Location1">Stations</span>
          </Link>

          <Link
            to=""
            className="Location"
            style={{ color: userClicked ? "black" : "grey" }}
            onClick={handleClickUser}
          >
            <span className="Location1">Current Rides</span>
          </Link>
        </div>

        {locationClicked && (
          <div className="locationDetailsBox">
            <MapContainer />
          </div>
        )}

        {/* Stations */}
        {stationClicked && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="StaionDetailsBox" style={{ marginLeft: "70px" }}>
              <p className="text">Total bikes</p>
              <p className="number">{totalBikes}</p>
            </div>
            <div className="StaionDetailsBox">
              <p className="text">Bikes in outside</p>
              <p className="number">{totalOnRideUsers}</p>
            </div>
            <div className="StaionDetailsBox">
              <p className="text">Bikes in stations</p>
              <p className="number">{bikesinStation}</p>
            </div>
            <div className="StaionDetailsBox">
              <p className="text">Bikes want maintenance</p>
              <p className="number">{bikesinMaintenance}</p>
            </div>
          </div>
        )}
        <div style={{ display: "flex", height: "10px" }}></div>

        {stationClicked && (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "13px",
              }}
            >
              <div className="StaionBox">
                <p className="text">Station : ST1</p>
                <div>
                  <div
                    className="insidebox"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p className="text">Current available bikes: </p>
                      <p className="text">{avlBikesST1}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p className="text">Current parking places: </p>
                      <p className="text">{parkingPlaceST1}</p>
                    </div>
                  </div>
                  <div className="position_of_chart">
                    <Doughnut data={dataST1} option={option}></Doughnut>
                  </div>
                </div>
              </div>

              <div className="StaionBox">
                <p className="text">Station : ST2</p>
                <div
                  className="insidebox"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="text">Current avilable bikes: </p>
                    <p className="text">{avlBikesST2}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="text">Current parking places: </p>
                    <p className="text">{parkingPlaceST2}</p>
                  </div>
                </div>
                <div className="position_of_chart">
                  <Doughnut data={dataST2} option={option}></Doughnut>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", height: "10px" }}></div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "13px",
              }}
            >
              <div className="StaionBox">
                <p className="text">Station : ST3</p>
                <div
                  className="insidebox"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="text">Current avilable bikes: </p>
                    <p className="text">{avlBikesST3}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="text">Current parking places: </p>
                    <p className="text">{parkingPlaceST3}</p>
                  </div>
                </div>
                <div className="position_of_chart">
                  <Doughnut data={dataST3} option={option}></Doughnut>
                </div>
              </div>

              <div className="StaionBox">
                <p className="text">Station : ST4</p>
                <div
                  className="insidebox"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="text">Current avilable bikes: </p>
                    <p className="text">{avlBikesST4}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="text">Current parking places: </p>
                    <p className="text">{parkingPlaceST4}</p>
                  </div>
                </div>
                <div className="position_of_chart">
                  <Doughnut data={dataST4} option={option}></Doughnut>
                </div>
              </div>
            </div>
          </div>
        )}

        {userClicked && (
          <div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <div
                    className="StaionDetailsBoxuser"
                    style={{ marginLeft: "70px" }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p className="text">Total users</p>
                      <p
                        className="text"
                        style={{ marginLeft: "100px", fontSize: "14px" }}
                      >
                        {todayDate}
                      </p>
                    </div>

                    <p className="numberuser1">{totalNewUsers}</p>
                  </div>
                </div>
                <div className="StaionDetailsBoxuser">
                  <p className="text">Total current users</p>
                  <p className="numberuser">{totalCurrentUsers}</p>
                </div>
                <div className="StaionDetailsBoxuser">
                  <p className="text">On-Ride users</p>
                  <p className="numberuser">{totalOnRideUsers}</p>
                </div>
                <div className="StaionDetailsBoxuser">
                  <p className="text">Total ride</p>
                  <p className="numberuser">{allRides}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="current_User">Current Rides</div>
                <div
                  className="Search_User"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ marginRight: "5px" }}
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    style={{ border: "none", outline: "none", width: "120px" }}
                  ></input>
                </div>
              </div>

              <div>
                {/* <Container> */}
                {/* <Form>
                <InputGroup className="my-3">
                  <Form.Control placeholder='search'/>
                </InputGroup>
              </Form> */}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Ride Id</th>
                      <th scope="col">Profile</th>
                      <th scope="col">User Id</th>
                      <th scope="col">Bike Id</th>
                      <th scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {currentRides.map((ride, index) => (
                      <tr>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>
                        <td>{ride.rideId}</td>
                        <td>
                          <div className="profile-circle"></div>{" "}
                          {/* Circular profile picture */}
                        </td>
                        <td>{ride.userId}</td>
                        <td>{ride.bikeId}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              onClick={() => {
                                setUserView(true);
                                setSelectedUser(ride); // Set the selected user
                              }}
                              className="dropbtn"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* </Container> */}
                {userView && selectedUser && (
                  <div className="QrWindow">
                    <Current_user_view
                      handleQrWindowClose={() => setUserView(false)}
                      selectedUser={selectedUser}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
