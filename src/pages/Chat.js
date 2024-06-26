import React from "react";

function Chat() {
  return (
    <div>
      <div className="Dashboard">
        <div className="dashboardRow">
          <span>Dashboard</span>
          <span>{">"}</span>
          <span> Chat </span>
        </div>
      </div>
      <div
        className="paymentbox"
        style={{ display: "flex", flexDirection: "column" }}
      ></div>
    </div>
  );
}

export default Chat;
