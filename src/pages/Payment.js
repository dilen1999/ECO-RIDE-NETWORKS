import React, { useEffect, useState, useRef } from "react";
import "./Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Payment() {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState([]); // State to hold user payments
  const [revenueData, setRevenueData] = useState([]); // State to hold monthly revenue data
  const chartRef = useRef(null); // Ref for the chart instance

  useEffect(() => {
    fetchMonthlyRevenueData();
    fetchUserPayments();
  }, []);

  const fetchMonthlyRevenueData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const months = Array.from({ length: 12 }, (_, i) => i + 1);

      const promises = months.map((month) =>
        axios.get(
          `https://backend-host-9thd.onrender.com/api/v1/userpayment/monthlySum?year=${currentYear}&month=${month}`
        )
      );

      const responses = await Promise.all(promises);
      const monthlyData = responses.map((response, index) => ({
        label: new Date(currentYear, index).toLocaleString("en-US", {
          month: "short",
        }),
        revenue: response.data,
        cost: response.data * 0.5, // assuming cost is 50% of revenue, replace with actual calculation
      }));

      setRevenueData(monthlyData);
    } catch (error) {
      console.error("Error fetching monthly revenue data:", error);
    }
  };

  const fetchUserPayments = async () => {
    try {
      const response = await axios.get(
        "https://backend-host-9thd.onrender.com/api/v1/userpayment/all"
      );
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching user payments:", error);
    }
  };

  // Cleanup chart on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div className="Dashboard">
        <div className="dashboardRow">
          <span>Dashboard </span>
          <span>{">"}</span>
          <span> Payment </span>
        </div>
      </div>
      <div
        className="paymentbox"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="paymentbox1"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Line
            ref={chartRef}
            data={{
              labels: revenueData.map((data) => data.label),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData.map((data) => data.revenue),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Cost",
                  data: revenueData.map((data) => data.cost),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: "category",
                },
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                title: { display: true, text: "Monthly Revenue & Cost" },
              },
            }}
          />
        </div>
        <div className="paymentbox2">
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="current_User">Payment</div>
              <div
                className="bike-Search_User"
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
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  style={{ border: "none", outline: "none", width: "120px" }}
                />
              </div>
            </div>
            <div className="payment_table table-container">
              <table className="bike-table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Estimated Amount</th>
                    <th scope="col">Daily Cost Amount</th>
                    <th scope="col" style={{ width: "20%" }}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {payments
                    .filter(
                      (payment) =>
                        payment.id.toString().includes(search) ||
                        payment.estimatedAmount.toString().includes(search) ||
                        payment.paymentDate.includes(search)
                    )
                    .map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.estimatedAmount}</td>
                        <td>{payment.estimatedAmount / 2}</td> {/* Display half of the estimated amount */}
                        <td>{payment.paymentDate}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
