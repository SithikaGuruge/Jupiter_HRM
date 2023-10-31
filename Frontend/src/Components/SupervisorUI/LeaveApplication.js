import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LeaveApplication = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [status, setStatus] = useState("false");
  const [errorMessage, setErrorMessage] = useState("");
  const handleAccept = (i) => {
    // Get the specific record for the clicked button
    const updatedRecord = [...record];
    updatedRecord[i].Approval_status = "Accepted";
    if (status === "false") {
      setStatus("true");
    } else {
      setStatus("false");
    }

    // Send the specific record to the backend
    axios
      .post("http://localhost:5001/api/SupUI/edited/leaveApplications", {
        status: "Accepted",
        record: updatedRecord[i],
      })
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Record accepted and sent to the server");
        setErrorMessage(response.data.message);
      })
      .catch((err) => {
        console.error("Error sending record to the server", err);
      });
  };

  const handleReject = (i) => {
    // Get the specific record for the clicked button
    const updatedRecord = [...record];
    updatedRecord[i].Approval_status = "Rejected";
    if (status === "false") {
      setStatus("true");
    } else {
      setStatus("false");
    }

    // Send the specific record to the backend
    axios
      .post("http://localhost:5001/api/SupUI/edited/leaveApplications", {
        status: "Rejected",
        record: updatedRecord[i],
      })
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Record rejected and sent to the server");
        setErrorMessage(response.data.message);
      })
      .catch((err) => {
        console.error("Error sending record to the server", err);
      });
  };
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
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/SupUI/leaveApplications")
      .then((response) => {
        setRecord(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  return (
    <div>
      <h1>Leave Application</h1>
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Leave Application ID</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Leave Type</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Accept / Reject</th>
          </tr>
        </thead>
        <tbody>
          {record.map((item, i) => (
            <tr key={i}>
              <td>{item.Leave_Application_No}</td>
              <td>{item.Employee_ID}</td>
              <td>{item.LeaveType}</td>
              <td>{item.Start_Date.split("T")[0]}</td>
              <td>{item.End_Date.split("T")[0]}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleAccept(i)}
                  className="btn btn-primary"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginRight: "50px",
                    marginTop: "20px",
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => handleReject(i)}
                  className="btn btn-primary"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginRight: "50px",
                    marginTop: "20px",
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={goBack}
        type="button"
        className="btn btn-primary"
        style={{
          color: "white",
          fontSize: "16px",
          marginRight: "50px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Back
      </button>
      <br />
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
