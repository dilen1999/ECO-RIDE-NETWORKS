import React, { useEffect } from "react";
import "./Addbike.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import QrCodeGenerator from "./QrCodeGenerator";

function Addbike() {
  const [qrcode, setQrcode] = useState(false);
  const [addbike, setAddbike] = useState({
    brand: "",
    bikeModel: "",
    color: "",
    bikeCode: "",
    // lastMaintenanceDate: "",
    initStationId: "",
  });

  const navigate = useNavigate();
  const [latestBikeId, setLatestBikeId] = useState("");

  const handleClick = () => {
    navigate("/qrcode");
  };

  const { brand, bikeCode, color, bikeModel, initStationId } = addbike;

  const onInputChange = (e) => {
    setAddbike({ ...addbike, [e.target.name]: e.target.value });
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   // Check if any input field is empty
  //   const isEmptyField = Object.values(addbike).some((value) => !value);

  //   console.log("isEmptyField:", isEmptyField); // Log isEmptyField value for debugging

  //   if (isEmptyField) {
  //     // If any field is empty, show an alert or handle it in your preferred way
  //     alert("Please fill in all the fields");
  //     return;
  //   }

  //   try {
  //     await axios.post("http://localhost:8080/Bikes", addbike);
  //     // Successful submission, navigate to the home page
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Error adding bike:", error);
  //     // Handle error here, you can display a message to the user or perform any necessary action.
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isEmptyField = Object.values(addbike).some((value) => !value);

    if (isEmptyField) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      const requestData = {
        bike: {
          brand: addbike.brand,
          bikeModel: addbike.bikeModel,
          bikeCode: addbike.bikeCode,
          color: addbike.color,
        },
        initStationId: addbike.initStationId,
      };
      console.log(requestData);
      await axios.post("https://backend-host-9thd.onrender.com/api/v1/Bikes", requestData);

      // window.location.href = '/bike';
    } catch (error) {
      console.error("Error adding bike:", error);
    }
  };

  const fetchLatestBikeId = async () => {
    try {
      const response = await axios.get(
        "https://backend-host-9thd.onrender.com/api/v1/Bikes/latestBikeId"
      );
      setLatestBikeId(response.data); // Update here
    } catch (error) {
      console.error("Error fetching latest bike ID:", error);
    }
  };

  useEffect(() => {
    fetchLatestBikeId();
  }, []);

  const openHome = () => {
    navigate("/home");
  };

  return (
    <div className="addbikeboxbike">
      <div className="addbike-text">
        Add your bike details in here
        <form onSubmit={(e) => onSubmit(e)}>
          <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Bike ID</text>
            <text className="addbiketextwidth12">:</text>
            <text>{latestBikeId + 1}</text>
          </div>
          <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Bike brand</text>
            <text className="addbiketextwidth12">:</text>
            <input
              className="addbikeinput"
              placeholder="bike brand here"
              name="brand"
              value={brand}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Bike model</text>
            <text className="addbiketextwidth12">:</text>
            <input
              className="addbikeinput"
              placeholder="bike model here"
              name="bikeModel"
              value={bikeModel}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Bike code No</text>
            <text className="addbiketextwidth12">:</text>
            <input
              className="addbikeinput"
              placeholder="bike code no here"
              name="bikeCode"
              value={bikeCode}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Bike color</text>
            <text className="addbiketextwidth12">:</text>
            <input
              className="addbikeinput"
              placeholder="bike color here"
              name="color"
              value={color}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          {/* <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Last maintenance date</text>
            <text className="addbiketextwidth12">:</text>
            <input
              className="addbikeinput"
              placeholder="2024-12-12"
              name="lastMaintenanceDate"
              value={lastMaintenanceDate}
              onChange={(e) => onInputChange(e)}
            />
          </div> */}
          <div
            style={{ display: "flex", direction: "row" }}
            className="bike-format"
          >
            <text className="addbiketextwidth">Stattion Id</text>
            <text className="addbiketextwidth12">:</text>
            <input
              className="addbikeinput"
              placeholder="ST1"
              name="initStationId"
              value={initStationId}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div style={{ display: "flex", direction: "row" }}>
            <button
              type="submit"
              onClick={() => {
                //openHome();
                // handleClick(); // Call your second function here
                setQrcode(true);
              }}
              className="addbikepagebutton"
            >
              Add bike
            </button>

            <Link to="/homepage" className="cancelbikepagebutton">
              Cancel
            </Link>
          </div>
        </form>
      </div>
      {qrcode && (
        <div className="QrWindow">
          <QrCodeGenerator handleQrWindowClose={() => setQrcode(false)} />
        </div>
      )}
    </div>
  );
}

export default Addbike;
