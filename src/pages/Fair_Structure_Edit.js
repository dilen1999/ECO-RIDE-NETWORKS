import React, { useEffect, useState } from "react";
import "./FairStructure.css";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

function FairStructure_Edit() {
  const [hourly, sethourly] = useState([]);
  const [monthly,setMonthly] = useState([]);
  const [Weekly,setweekly]= useState([]);
  const [daily,setDaily]= useState([]);

  // const {id}= useParams;

  // useEffect(() => {
  //   faresettingshour();
  //   faresettingsmonthly();
  //   faresettingsdaily();
  //   faresettingsweekly();
  // });

  // const faresettingshour = async () => {
  //   const result = await axios.get("http://localhost:8080/fare/hourly-rate");
  //   sethourly(result.data);
  //   console.log(hourly);
  // };

  // const faresettingsmonthly = async ()=>{
  //   const result = await axios.get("http://localhost:8080/fare/monthly-rate");
  //   setMonthly(result.data);
  //   console.log(monthly);
  // }
  // const faresettingsdaily = async ()=>{
  //   const result = await axios.get("http://localhost:8080/fare/daily-rate");
  //   setDaily(result.data);
  //   console.log(daily);
  // }

  // const faresettingsweekly = async () => {
  //   const result = await axios.get("http://localhost:8080/fare/weekly-rate");
  //   setweekly(result.data);
  //   console.log(Weekly);
  // };

  // const onSubmit = async (e)=>{
  //   e.preventDefault();
  //   await axios.put(`http://localhost:8080/fare/settings`);

  //   Navigate("/home");
  // }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSettings = {
        hourly: hourly,
        monthly: monthly,
        weekly: Weekly,
        daily: daily
      };
  
      await axios.put("http://localhost:8080/fare/settings", updatedSettings);
      
      // If the update is successful, navigate to the home page
      // Make sure you have imported the Navigate component from react-router-dom
      Navigate("/home");
    } catch (error) {
      console.error("Error updating fare settings:", error);
      // Handle errors, show error message to the user, etc.
    }
  };
  

  const loadFare =async()=>{
    const result=await axios.get(``)
  }
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
              {/* <td>{"Rs " + hourly}</td> */}
              <td></td>
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
              {/* <td>{"Rs "+ daily}</td> */}
              <td></td>
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Weekly Plan</text>
              <text className="faddbiketextwidth12">:</text>
              {/* <input className="faddbikeinput" placeholder="Rs 2000" name="" /> */}
              {/* <td>{"Rs "+ Weekly}</td> */}
              <td></td>
            </div>
            <div
              style={{ display: "flex", direction: "row" }}
              className="fbike-format"
            >
              <text className="faddbiketextwidth">Monthly Plan</text>
              <text className="faddbiketextwidth12">:</text>
              {/* <input className="faddbikeinput" placeholder="Rs 8000" name="" /> */}
              {/* <td>{"Rs "+ monthly}</td> */}
              <td></td>
            </div>
            <div style={{ display: "flex", direction: "row" }}>
              <button type="submit" className="faddbikepagebutton">
                Save
              </button>

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

export default FairStructure_Edit;
