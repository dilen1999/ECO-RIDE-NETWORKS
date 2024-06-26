import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./components/login_Page";
import Bike from "./pages/bike";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import User from "./pages/User";
import Payment from "./pages/Payment";
import Chat from "./pages/Chat";

import Notification from "./pages/Notification";
import Maintenance from "./pages/Maintenance";
import Fair_Structure from "./pages/Fair_Structure";
import Report1 from "./pages/Report";

import Userviewview from "./components/Userviewview";
import QrCodeGenerator from "./components/QrCodeGenerator";
import FairStructure_Edit from "./pages/Fair_Structure_Edit";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<Home/>}/> */}
          <Route path="/user/view" element={<Userviewview />} />
          <Route path="/qrcode" element={<QrCodeGenerator />} />

          <Route
            path="/Editfare"
            element={
              <Sidebar>
                <FairStructure_Edit />
              </Sidebar>
            }
          />
          <Route
            path="/home"
            element={
              <Sidebar>
                <Home />
              </Sidebar>
            }
          />
          <Route
            path="/bike"
            element={
              <Sidebar>
                <Bike />
              </Sidebar>
            }
          />
          <Route
            path="/user"
            element={
              <Sidebar>
                <User />
              </Sidebar>
            }
          />
          <Route
            path="/payment"
            element={
              <Sidebar>
                <Payment />
              </Sidebar>
            }
          />
          <Route
            path="/chat"
            element={
              <Sidebar>
                <Chat />
              </Sidebar>
            }
          />
          <Route
            path="/reports"
            element={
              <Sidebar>
                <Report1 />
              </Sidebar>
            }
          />
          <Route
            path="/fair_structure"
            element={
              <Sidebar>
                <Fair_Structure />
              </Sidebar>
            }
          />
          <Route
            path="/notification"
            element={
              <Sidebar>
                <Notification />
              </Sidebar>
            }
          />
          <Route
            path="/maintenance"
            element={
              <Sidebar>
                <Maintenance />
              </Sidebar>
            }
          />
          {/* <Route path="/home/location" element={<Location/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
