import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ViewEmployee = () => {
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
  const [record, setRecord] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/employeeInfo/employee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecord(data);
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  //get dependents data
  const [dependents, setDependents] = useState([]);
  const [isNull, setIsNull] = useState(true);
  const [dependentsColumn, setDependentsColumn] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/dependantsDetails/employee")
      .then((response) => {
        setDependentsColumn(Object.keys(response.data[0]));
        setDependents(response.data);
        if (response.data.length != 0) {
          setIsNull(false);
        }
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  //get employee custom attributes
  const [customAttributes, setCustomAttributes] = useState([]);
  const [isCustomNull, setIsCustomNull] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/employee/customAttributes")
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
      <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
        <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Personal Informations
        </h1>
        {record.map((record) => (
          <div
            style={{
              border: "2px solid black",
              padding: "20px",
              marginTop: "20px",
              marginBottom: "20px",
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
            <h5>
              Birthdate : {new Date(record.Birthday).toLocaleDateString()}
            </h5>
            <h5>Gender : {record.Gender}</h5>
            <h5>
              Emergency Contact Number : {record.Emergency_contact_Number}
            </h5>
            <h5>Department : {record.Department}</h5>
            <h5>Marital Status : {record.Marital_status}</h5>
            <h5>Status Type : {record.Status_Type}</h5>

            <h5>Pay Grade : {record.Pay_grade}</h5>
            {record.Supervisor_Name !== null && (
              <h5>Supervisor Name: {record.Supervisor_Name}</h5>
            )}
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
          </div>
        ))}
        {!isNull && (
          <div>
            <h1 style={{ marginBottom: "20px", marginTop: "10px" }}>
              Dependents Details
            </h1>
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
      </div>
    </div>
  );
};

export default ViewEmployee;
