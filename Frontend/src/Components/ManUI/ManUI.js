import axios from "axios";
import { Link } from "react-router-dom";
//import bootsrap from "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ManUI = () => {
  const navigate = useNavigate();
  const handleViewPersonalInfo = () => {
    navigate("/login/Employee/EmployeeUI/PersonalInfo");
  };
  const handleAddEmployee = () => {
    navigate("/login/Employee/ManUI/AddEmployee");
  };
  const handleEmployeeInfo = () => {
    navigate("/login/Employee/ManUI/EmployeeInfo");
  };
  const handleLogOut = () => {
    axios.get("http://localhost:5001/api/logout");
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid) {
          navigate(`/login/Employee:${response.data.role}`);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  to="/login/Employee/ManUI/AddEmployee"
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Add Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/ManUI/EmployeeInfo"
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  View Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/PersonalInfo"
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  View My Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/ManUI/request-leave"
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  View Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/EmployeeUI/request-leave"
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Request Leave
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login/Employee/reset-password"
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Reset Password
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  onClick={handleLogOut}
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1>Manager UI</h1>

      <button type="button" onClick={handleViewPersonalInfo}>
        View My Details
      </button>
      <button type="button" onClick={handleAddEmployee}>
        Add Employee
      </button>
      <button type="button" onClick={handleEmployeeInfo}>
        View Employees
      </button>
    </div>
  );
};

export default ManUI;
