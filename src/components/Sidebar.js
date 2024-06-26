import React, { useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBicycle,
  faUser,
  faSquarePollHorizontal,
  faBell,
  faPersonFallingBurst,
  faFileInvoiceDollar,
  faScrewdriverWrench,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logoCycle.png";
import profile from "../images/profile.png";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import Bike from "../pages/bike";
import User from "../pages/User";
import Payment from "../pages/Payment";
import Chat from "../pages/Chat";

import Notification from "../pages/Notification";
import Maintenance from "../pages/Maintenance";
import Fair_Structure from "../pages/Fair_Structure";
import Report1 from "../pages/Report";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("Home");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* First column */}
      <div style={{ width: "15%" }}>
        <div className="circle_logo">
          <img src={logo} alt="" className="logo_image" />
        </div>
        <div className="app_name">
          <div>
            <span className="color_text">EcoRide</span>
          </div>
          <div>
            <span>Networks</span>
          </div>
        </div>

        <div>
          <Link
            to="/home"
            className="home_button"
            style={{ color: activeTab === "Home" ? "black" : "grey" }}
            onClick={() => handleClick("Home")}
          >
            <FontAwesomeIcon icon={faHome} />
            <span className="home_adj">Home</span>
          </Link>
        </div>

        <div>
          <Link
            to="/bike"
            className="home_button_spaceB"
            style={{ color: activeTab === "Bikes" ? "black" : "grey" }}
            onClick={() => handleClick("Bikes")}
          >
            <FontAwesomeIcon icon={faBicycle} />
            <span className="home_adj">Bikes</span>
          </Link>
        </div>

        <div>
          <Link
            to="/user"
            className="home_button_spaceU"
            style={{ color: activeTab === "User" ? "black" : "grey" }}
            onClick={() => handleClick("User")}
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="home_adj">User</span>
          </Link>
        </div>

        <div>
          <Link
            to="/payment"
            className="home_button_spaceP"
            style={{ color: activeTab === "Payment" ? "black" : "grey" }}
            onClick={() => handleClick("Payment")}
          >
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
            <span className="home_adj">Payment</span>
          </Link>
        </div>

        <div>
          <Link
            to="/reports"
            className="home_button_spaceR"
            style={{ color: activeTab === "Reports" ? "black" : "grey" }}
            onClick={() => handleClick("Reports")}
          >
            <FontAwesomeIcon icon={faSquarePollHorizontal} />
            <span className="home_adj">Reports</span>
          </Link>
        </div>

        <div>
          <Link
            to="/notification"
            className="home_button_spaceN"
            style={{ color: activeTab === "Notification" ? "black" : "grey" }}
            onClick={() => handleClick("Notification")}
          >
            <FontAwesomeIcon icon={faBell} />
            <span className="home_adj">Notification</span>
          </Link>
        </div>

        <div>
          <Link
            to="/fair_structure"
            className="home_button_spaceF"
            style={{ color: activeTab === "Fair_Structure" ? "black" : "grey" }}
            onClick={() => handleClick("Fair_Structure")}
          >
            <FontAwesomeIcon icon={faPersonFallingBurst} />
            <span className="home_adj">Fair Structure</span>
          </Link>
        </div>

        <div>
          <Link
            to="/maintenance"
            className="home_button_spaceM"
            style={{ color: activeTab === "Maintenance" ? "black" : "grey" }}
            onClick={() => handleClick("Maintenance")}
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} />
            <span className="home_adj">Maintenance</span>
          </Link>
        </div>

        <div>
          <Link
            to="/chat"
            className="home_button_spaceC"
            style={{ color: activeTab === "Chat" ? "black" : "grey" }}
            onClick={() => handleClick("Chat")}
          >
            <FontAwesomeIcon icon={faMessage} />
            <span className="home_adj">Chat</span>
          </Link>
        </div>

        <div style={{ width: "20%", display: "flex", flexDirection: "row" }}>
          <div className="circle_logo_profile">
            <div className="inner_circle_profile"></div>
            <img src={profile} alt="" className="logo_image_profile" />
          </div>
          <div className="profile_name">
            <text>Anantharam</text>
          </div>
        </div>
        <div className="dot">
          <text>.</text>
        </div>
      </div>

      {/* Second column */}
      <div style={{ width: "85%" }} className="column">
        {/* Render content dynamically based on activeTab state */}
        {activeTab === "Home" && <Home />}
        {activeTab === "Bikes" && <Bike />}
        {activeTab === "User" && <User />}
        {activeTab === "Payment" && <Payment />}
        {activeTab === "Reports" && <Report1 />}
        {activeTab === "Notification" && <Notification />}
        {activeTab === "Fair_Structure" && <Fair_Structure />}
        {activeTab === "Maintenance" && <Maintenance />}
        {activeTab === "Chat" && <Chat />}
      </div>
    </div>
  );
}

export default Sidebar;
