import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Notification() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="Dashboard">
        <div className="dashboardRow">
          <span>Dashboard</span>
          <span>{">"}</span>
          <span> Notification </span>
        </div>
      </div>
      <div
        className="paymentbox"
        style={{ display: "flex", flexDirection: "column" }}
      ></div>
    </div>
  );
}

export default Notification;
