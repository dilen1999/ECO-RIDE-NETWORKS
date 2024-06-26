import React, { useState, useEffect, useRef } from "react"; // Import useRef and useEffect
import * as htmlToImage from "html-to-image";
import "../components/QrCodeGenerator.css";
import QRCode from "react-qr-code";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function QrCodeGenerator({handleQrWindowClose}) {
  const [url, setUrl] = useState(""); // Update to hold bike details
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [qrbikes, setQRBikes] = useState({});

  const qrCodeRef = useRef(null);

  useEffect(() => {
    loadBikes(); // Load bikes when the component mounts
  }, []);

  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }
    setQrIsVisible(true);
  };

  const handleClick = () => {
    let timerInterval;
    Swal.fire({
      title: "Save QR Code",
      html: "I will close in <b></b> milliseconds.",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  const loadBikes = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8095/api/v1/Bikes/latestBikeId"
      );
      const latestBike = result.data;
      // Construct the bike details string
      const bikeDetails = `Bike ID: ${latestBike.bikeId+1}, Model: ${latestBike.bikeModel}, Code: ${latestBike.bikeCode}, Color: ${latestBike.color}`;
      setUrl(bikeDetails); // Update the url state with the bike details
      setQRBikes(latestBike);
    } catch (error) {
      console.error("Error fetching latest bike details:", error);
    }
  };

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `Bike ID:${qrbikes.bikeId}.png`; // Use qrbikes.bike_id instead of latestBike.bike_id
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="qrcode__container">
      <div className="closeQrWindow">
        <FontAwesomeIcon onClick={handleQrWindowClose} icon={faClose} />
      </div>
      <h1 style={{textAlign:'center'}}>QR Code Generator</h1>
      <div className="qrcode__container--parent">
        <div className="qrcode__input">
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
        </div>
        {qrIsVisible && (
          <div className="qrcode__download">
            <div className="qrcode__image" ref={qrCodeRef}>
              <QRCode value={url} size={300} />
            </div>
            <Link to="/home">
              <button
                onClick={() => {
                  handleClick();
                  downloadQRCode();
                }}
              >
                Download QR Code
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCodeGenerator;
