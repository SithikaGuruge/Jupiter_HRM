import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
//import bootsrap from "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
const SupervisorUI = () => {
  const navigate = useNavigate();
  const handleViewPersonalInfo = () => {
    navigate("/login/Employee/EmployeeUI/PersonalInfo");
  };
  const handleRequestLeave = () => {
    navigate("/login/Employee/EmployeeUI/request-leave");
  };
  const handleLeaveApplications = () => {
    navigate("/login/Employee/SupUI/leaveApplication");
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (
          (response.data.valid && response.data.role === "JT003") ||
          response.data.role === "JT004" ||
          response.data.role === "JT009" ||
          response.data.role === "JT005"
        ) {
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleLogOut = () => {
    axios.get("http://localhost:5001/api/logout");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/login/Employee/ManUI" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/request-leave"
                  className="nav-link"
                >
                  Request Leave
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/ManUI/request-leave"
                  className="nav-link"
                >
                  View Leave Informations
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/PersonalInfo"
                  className="nav-link"
                >
                  View My Details
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login/Employee/reset-password" className="nav-link">
                  Reset Password
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={handleLogOut} className="nav-link">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1>SupervisorUI</h1>
      <button
        type="button"
        className="button-with-icon"
        onClick={handleViewPersonalInfo}
      >
        View Personal Info
      </button>
      <button
        type="button"
        className="button-with-icon"
        onClick={handleRequestLeave}
      >
        Request Leave
      </button>
      <button
        type="button"
        className="button-with-icon"
        onClick={handleLeaveApplications}
      >
        View Leave Applications
      </button>
    </div>
  );
};

export default SupervisorUI;
