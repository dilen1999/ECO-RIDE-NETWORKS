import React, { useEffect, useState } from "react";
import "./FairStructure.css";
import { Link } from "react-router-dom";
import axios from "axios";

function FairStructure() {
  const [hourly, sethourly] = useState([]);
  const [monthly,setMonthly] = useState([]);
  const [Weekly,setweekly]= useState([]);
  const [daily,setDaily]= useState([]);




  useEffect(() => {
    faresettingshour();
    faresettingsmonthly();
    faresettingsdaily();
    faresettingsweekly();
  });

  const faresettingshour = async () => {
    const result = await axios.get("https://backend-host-9thd.onrender.com/api/v1/fare/hourly-rate");
    sethourly(result.data);
    console.log(hourly);
  };

  const faresettingsmonthly = async ()=>{
    const result = await axios.get("https://backend-host-9thd.onrender.com/api/v1/fare/monthly-rate");
    setMonthly(result.data);
    console.log(monthly);
  }
  const faresettingsdaily = async ()=>{
    const result = await axios.get("https://backend-host-9thd.onrender.com/api/v1/fare/daily-rate");
    setDaily(result.data);
    console.log(daily);
  }

  const faresettingsweekly = async () => {
    const result = await axios.get("https://backend-host-9thd.onrender.com/api/v1/fare/weekly-rate");
    setweekly(result.data);
    console.log(Weekly);
  };

  return (
    <div>
      <div className="Dashboard">
        <div className="dashboardRow">
          <span>Dashboard </span>
          <span>{">"}</span>
          <span> Fair Structure </span>
        </div>
      </div>
      <div
        className="paymentbox"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="fair_heading">
          <h3>Pay-As-You-Go Plans</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <form>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Minimum Fare</text>
              <text className="faddbiketextwidth12">:</text>
              {/* <input
                className="faddbikeinput"
                placeholder={`Rs ${hourlyRate}`}
                name=""
              /> */}
              <td>{"Rs " + hourly}</td>
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Threshold Time 1</text>
              <text className="faddbiketextwidth12">:</text>
              <input className="faddbikeinput" placeholder="1 Hour" name="" />
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">
                Fare per 1 hour after Threshold Time1
              </text>
              <text className="faddbiketextwidth12">:</text>
              <input className="faddbikeinput" placeholder="Rs 300" name="" />
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Threshold Time 2</text>
              <text className="faddbiketextwidth12">:</text>
              <input className="faddbikeinput" placeholder="3 Hours" name="" />
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">
                Fare per 1 hour after Threshold Time2
              </text>
              <text className="faddbiketextwidth12">:</text>
              <input className="faddbikeinput" placeholder="Rs280" name="" />
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Threshold Time 3</text>
              <text className="faddbiketextwidth12">:</text>
              <input className="faddbikeinput" placeholder="6 Hours" name="" />
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">
                Fare per 1 hour after Threshold Time3
              </text>
              <text className="faddbiketextwidth12">:</text>
              <input className="faddbikeinput" placeholder="Rs250" name="" />
            </div>
            <div style={{ marginTop: "50px" }}></div>
            <div className="fair_heading">
              <h3>Subscription Plans</h3>
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Daily Plan</text>
              <text className="faddbiketextwidth12">:</text>
              {/* <input className="faddbikeinput" placeholder="Rs 500" name="" /> */}
              <td>{"Rs "+ daily}</td>
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Weekly Plan</text>
              <text className="faddbiketextwidth12">:</text>
              {/* <input className="faddbikeinput" placeholder="Rs 2000" name="" /> */}
              <td>{"Rs "+ Weekly}</td>
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Monthly Plan</text>
              <text className="faddbiketextwidth12">:</text>
              {/* <input className="faddbikeinput" placeholder="Rs 8000" name="" /> */}
              <td>{"Rs "+ monthly}</td>
            </div>
            <div style={{ display: "flex", direction: "row" }}>
              <Link to={"/Editfare"} className="faddbikepagebutton">
                Edit
              </Link>

              <Link to="/home" className="fcancelbikepagebutton">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FairStructure;
