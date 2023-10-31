import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const PersonalInfo = () => {
  const [record, setRecord] = useState([]);
  var edit = false;
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/personalInfo")
      .then((response) => response.json())
      .then((data) => {
        setRecord(data[0]);
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid) {
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get dependents data
  const [dependents, setDependents] = useState([]);
  const [isNull, setIsNull] = useState(true);
  const [dependentsColumn, setDependentsColumn] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/dependantsDetails")
      .then((response) => response.json())
      .then((data) => {
        setDependentsColumn(Object.keys(data[0]));
        setDependents(data);
        if (data.length != 0) {
          setIsNull(false);
        }
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [isCustomNull, setIsCustomNull] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/personal/customAttributes")
      .then((response) => {
        setCustomAttributes(response.data);
        if (response.data.length != 0) {
          setIsCustomNull(false);
        }
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/login/Employee" className="navbar-brand">
            Logout
          </Link>
        </div>
      </nav>

      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Personal information
        </h1>

        <div
          style={{
            border: "2px solid black",
            padding: "20px",
            marginTop: "50px",
            marginBottom: "50px",
            borderRadius: "10px",
            width: "45%",
            display: "flex",
            flexDirection: "column", // Align children vertically
            alignItems: "center", // Center children horizontally
            // Center children horizontally
          }}
        >
          <h5>Name : {record.Name}</h5>
          <h5>Job Title : {record.Job_Title}</h5>
          <h5>Branch : {record.Branch_Name}</h5>
          <h5>Birthdate : {new Date(record.Birthday).toLocaleDateString()}</h5>
          <h5>Gender : {record.Gender}</h5>
          <h5>Emergency Contact Number : {record.Emergency_contact_Number}</h5>
          <h5>Department : {record.Department}</h5>
          <h5>Marital Status : {record.Marital_status}</h5>
          <h5>Status Type : {record.Status_Type}</h5>

          <h5>Pay Grade : {record.Pay_grade}</h5>
          {record.Supervisor_Name !== null && (
            <h5>Supervisor Name: {record.Supervisor_Name}</h5>
          )}
          {record.Job_Title === "HR Manager" && (edit = true)}
        </div>
        {!isCustomNull && (
          <div>
            <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
              Custom Attributes
            </h1>
            {customAttributes.map((rec) => (
              <h5>
                {rec["Attribute"]} :{rec["value"]}
              </h5>
            ))}
          </div>
        )}

        {!isNull && (
          <div>
            <h1>Dependents Details</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  {dependentsColumn.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dependents.map((row) => (
                  <tr key={row.Name}>
                    {dependentsColumn.map((col) => (
                      <td key={`${row.Name}-${col}`}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={goBack}
            type="button"
            className="btn btn-primary"
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            Back
          </button>

          {edit && (
            <Link to="/login/Employee/ManUI/EditPI">
              <button
                className="btn btn-primary"
                style={{
                  color: "white",
                  fontSize: "16px",
                  marginLeft: "50px",
                }}
              >
                Edit
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
