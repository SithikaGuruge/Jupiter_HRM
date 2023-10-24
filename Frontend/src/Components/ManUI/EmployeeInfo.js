import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmployeeInfo.css";
import Pagination from "./pagination";
import axios from "axios";
const EmployeeInfo = () => {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid && response.data.role === "JT002") {
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/employeeInfo")
      .then((response) => response.json())
      .then((data) => {
        setColumns(Object.keys(data[0]));
        setRecords(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Employee Information
        </h1>
        <table className="table table-bordered" style={{ width: "70%" }}>
          <thead className="thead-dark">
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td key={index}>{record[column]}</td>
                ))}
                <td>
                  <Link
                    to="/login/Employee/ManUI/ViewEmployee"
                    style={{ color: "white" }}
                  >
                    <button
                      className="btn btn-success"
                      onClick={() => handleButtonClick(record.Employee_ID)}
                      style={{ marginRight: "5px" }}
                    >
                      View
                    </button>
                  </Link>
                  <Link
                    to="/login/Employee/ManUI/EditEmployee"
                    style={{ color: "white" }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => handleButtonClick(record.Employee_ID)}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={goBack}
            type="button"
            className="btn btn-primary"
            style={{
              color: "white",
              fontSize: "16px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Back
          </button>
        </div>
        <Pagination
          rowsPerPage={rowsPerPage}
          totalRecords={records.length}
          paginate={paginate}
        />
      </div>
    </div>
  );

  function handleButtonClick(employeeId) {
    fetch("http://localhost:5001/api/send-employee-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Employee_ID: employeeId }),
    })
      .then((data) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error");
      });
  }
};

export default EmployeeInfo;
