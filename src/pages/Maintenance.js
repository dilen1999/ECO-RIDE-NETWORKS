import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import "./Maintenance.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Maintenance() {
  const [searchu, setSearchu] = useState("");
  const [chainIssue, setChainIssue] = useState(false); // State for chain issue
  const [maintenance1, setMaintenance1] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [searchM, setSearchM] = useState("");
  const [todayDate, setTodayDate] = useState("");

  const handleChainIssue = (isChecked) => {
    setChainIssue(isChecked);
  };

  useEffect(() => {
    loadMaintenance1();
    setTodayDate(getFormattedDate(new Date()));
  }, []); // Load maintenance data on component mount

  const loadMaintenance1 = async () => {
    const result = await axios.get(
      "http://localhost:8095/api/v1/bikes/maintenance/all" // done 
    );
    setMaintenance1(result.data);
  };

    // Function to format date as "DD MonthName YYYY"
    const getFormattedDate = (date) => {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

  // const loadBikes = async () => {
  //   const result = await axios.get("http://localhost:8080/Bikes");
  //   setBikes(result.data);
  // };

  return (
    <div style={{ width: "100%" }} className="column">
      <div className="Dashboard">
        <div className="dashboardRow">
          <span>Dashboard </span>
          <span>{">"}</span>
          <span> Maintenance </span>
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
                  <p className="text">Total issues</p>

                  <p
                    className="text"
                    style={{ marginLeft: "100px", fontSize: "14px" }}
                  >
                    {todayDate}
                  </p>
                </div>
                {maintenance1.length > 0 && (
                  <p className="numberuser1">{maintenance1.length}</p>
                )}
              </div>
            </div>
            <div className="StaionDetailsBoxuser">
              <p className="text">Repair completed</p>
              <p className="numberuser">need to fill</p>
            </div>
            <div className="StaionDetailsBoxuser">
              <p className="text">Bikes to be repaired</p>
              <p className="numberuser">need to fill</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Station details */}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="current_User">Maintenance</div>
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
                placeholder="Search"
                onChange={(e) => setSearchu(e.target.value)}
                style={{ border: "none", outline: "none", width: "120px" }}
              />
            </div>
          </div>
          <div
            className="table-container"
            style={{ height: "55vh", width: "82vw" }}
          >
            <table className="bike-table">
              <thead style={{ textAlign: "center" }}>
                <tr>
                  <th scope="col" style={{ width: "6%" }}>
                    Index
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Date
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Bike ID
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Chain
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Lock
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Tyre
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Brake
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Basket
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Pedal
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {maintenance1
                  .filter((item) => {
                    return searchM.trim() === ""
                      ? true
                      : item.bike_id.toString().includes(searchM.trim());
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.formattedMaintenanceDate1}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.bike_id}</td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          className={item.type === "Chain" ? "redBox" : ""}
                        ></div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          className={item.type === "Lock" ? "redBox" : ""}
                        ></div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          className={item.type === "Tyre" ? "redBox" : ""}
                        ></div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          className={item.type === "Brake" ? "redBox" : ""}
                        ></div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          className={item.type === "Basket" ? "redBox" : ""}
                        ></div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          className={item.type === "Pedal" ? "redBox" : ""}
                        ></div>
                      </td>
                      <td style={{ textAlign: "center" }}>{item.comments}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
