import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login_page.css";
import img1 from "../images/img1.png";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const LOGIN_API_URL = "http://localhost:8095/api/v1/login";

  const handleLogin = () => {
    const loginData = {
      username: userName,
      password: password,
    };

    // Make a POST request to the login API endpoint
    axios
      .post(LOGIN_API_URL, loginData)
      .then((response) => {
        // Handle successful login response
        console.log("Login successful!");
        console.log("Received JWT token:", response.data.token);
        // Navigate to the home screen after successful login
        window.location.href = "/home";
      })
      .catch((error) => {
        // Handle login error
        console.error("Login failed:", error); // Print the error to the console
      });
  };

  return (
    <div className="container">
      <div>
        <img className="image" src={img1} alt="" />
      </div>
      <div>
        <div className="textStyle">
          <div>
            <span>Welcome To </span>
            <span className="color_text">EcoRide</span>
          </div>
          <span className="network">Networks</span>
        </div>
        <div>
          <div className="gap">
            <text className="Username">User Name</text>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="gap">
            <text className="Username">Password</text>
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="gap">
          <button className="login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
