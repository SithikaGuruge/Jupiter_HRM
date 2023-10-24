import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManagerUI = () => {
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

      
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <div className="container">
        <h1>Manager UI</h1>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-primary" onClick={handleViewPersonalInfo}>
            View My Details
          </button>
          <button type="button" className="btn btn-success" onClick={handleAddEmployee}>
            Add Employee
          </button>
        </div>
        <div className="mt-2">
          <button type="button" className="btn btn-info" onClick={handleEmployeeInfo}>
            View Employees
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ManagerUI;
