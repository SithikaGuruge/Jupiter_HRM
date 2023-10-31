import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LeaveRequest = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [record, setRecord] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5001/api/leaveDetails").then((res) => {
      console.log("success");
      console.log(res);
      setRecord(res.data[0]);
    });
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [leaveType, setLeaveType] = useState([]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5001/api/leaveTypes").then((res) => {
      console.log("success");
      console.log(res);
      setLeaveType(res.data.map((item) => item));
    });
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(
    () => {
      const sendLeaveRequest = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5001/api/leaveRequest",
            {
              LeaveType: selectedOption,
              StartDate: document.getElementById("start").value,
              EndDate: document.getElementById("end").value,
            }
          );
          setErrorMessage(response.data.message);
        } catch (error) {
          console.error("Error sending leave request", error);
        }
      };
      if (submit) sendLeaveRequest();
    },
    [submit],
    [selectedOption]
  );

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    console.log("Selected Option:", selectedOption);
  };

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1>Leave Request Form</h1>

      <h2>
        Remaining Maternity Leave count :
        {record.Remaining_Maternity_Leave_Count}
      </h2>
      <h2>
        Remaining No Pay Leave count : {record.Remaining_No_pay_Leave_Count}
      </h2>
      <h2>
        Remaining Annual Leave count : {record.Remaining_Annual_Leave_Count}
      </h2>
      <h2>
        Remaining Casual Leave count : {record.Remaining_Casual_Leave_Count}
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="mb-3">Select Leave Type:</label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleDropdownChange}
          required
        >
          <option value="">Select Type</option>
          {leaveType.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <label className="mb-3">Start Date:</label>
        <input type="date" id="start" name="start" required />
        <br />
        <label className="mb-3">End Date:</label>
        <input type="date" id="end" name="end" required />
        <br />
        <div className="mb-3">
          <p className="text-danger">{errorMessage}</p>
        </div>
        <button
          onClick={goBack}
          type="button"
          className="btn btn-primary"
          style={{
            color: "white",
            fontSize: "16px",
            marginRight: "50px",
            marginTop: "20px",
          }}
        >
          Back
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequest;
