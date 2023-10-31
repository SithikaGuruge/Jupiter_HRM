import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditPI = () => {
  const [jobTitleList, setJobTitleList] = useState([]);
  const [payGradeList, setPayGradeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const maritalStatusOptions = ["Un-Married", "Married", "Divorced", "Widowed"];
  const genderList = ["Male", "Female"];
  const navigate = useNavigate();
  const [dependents, setDependents] = useState([]);
  const [dependents1, setDependents1] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const visibleColumns = ["Name", "Age", "Relationship", "status"];

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
    const fetchJobTitleList = async () => {
      const response = await axios.get("http://localhost:5001/api/jobTitle");
      console.log(response.data);
      setJobTitleList(response.data.map((item) => item.Job_Title));
    };
    fetchJobTitleList();

    const fetchStatusList = async () => {
      const response2 = await axios.get("http://localhost:5001/api/status");
      console.log(response2.data);
      setStatusList(response2.data.map((item) => item.Status_Type));
    };
    fetchStatusList();

    const fetchPayGradeList = async () => {
      const response1 = await axios.get("http://localhost:5001/api/payGrade");
      console.log(response1.data);
      setPayGradeList(response1.data.map((item) => item.Pay_Grade));
    };
    fetchPayGradeList();

    const fetchBranchList = async () => {
      const response = await axios.get("http://localhost:5001/api/branch");
      console.log(response.data);
      setBranchList(response.data.map((item) => item.Branch_Name));
    };
    fetchBranchList();

    const DepartmentList = async () => {
      const response = await axios.get("http://localhost:5001/api/department");
      console.log(response.data);
      setDepartmentList(response.data.map((item) => item.Department_Name));
    };
    DepartmentList();
  }, []);

  //get informations of login employee
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/personalInfo");
        const data = await response.json();
        console.log(data);
        console.log("Data fetched from server");
        setRecord(data[0]);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchdata();
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    console.log("Form submitted:", {
      employeeId: record.Employee_ID,
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/personal/dependants")
      .then((response) => {
        setDependentsColumn(Object.keys(response.data[0]));
        setDependents(response.data);
        if (response.data.length != 0) {
          setIsNull1(false);
        }
      })
      .catch((error) => console.error("Error fetching data2:", error));
  }, []);

  useEffect(() => {
    const sendEditedDataToServer = async () => {
      try {
        if (formSubmitted) {
          const response = await fetch(
            "http://localhost:5001/api/ManUI/EditPI/edited",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                EmployeeID: record.Employee_ID,
                Name: record.Name,
                Branch_Name: record.Branch_Name,
                Birthday: record.Birthday,
                ContactNumber: record.Emergency_contact_Number,
                MaritalStatus: record.Marital_status,
                Job_Title: record.Job_Title,
                Status: record.Status_Type,
                PayGrade: record.Pay_grade,
                Supervisor: record.Supervisor_Name,
                Department: record.Department,
                Gender: record.Gender,
                Dependents: dependents,
              }),
            }
          );
          console.log(response);
          if (response.ok) {
            setErrorMessage("Successfully Edited");
          } else {
            setErrorMessage("Error occurred");
          }
        }
      } catch (error) {
        setErrorMessage("Error occurred");
        console.error("An error occurred:", error);
      }
    };

    const sendNewDependentsToServer = async () => {
      console.log("dependents", dependents1);
      console.log("form", formSubmitted);
      if (formSubmitted) {
        const response = await axios.post(
          "http://localhost:5001/api/ManUI/EditPI/newDependents",
          {
            EmployeeID: record.Employee_ID,
            Dependents: dependents1,
          }
        );
        console.log(response);
      }
    };

    const sendNewCustomAttributesToServer = async () => {
      if (formSubmitted) {
        console.log("attributes", attributes);
        console.log("form", formSubmitted);
        const response = await axios.post(
          "http://localhost:5001/api/ManUI/EditPI/newCustomAttributes",
          {
            EmployeeID: record.Employee_ID,
            Attributes: attributes,
          }
        );
        console.log(response);
      }
    };

    // Call the functions when formSubmitted changes

    sendEditedDataToServer();
    if (dependents1.length > 0) {
      sendNewDependentsToServer();
    }
    if (attributes.length > 0) {
      sendNewCustomAttributesToServer();
    }
  }, [formSubmitted]);

  const [isNull1, setIsNull1] = useState(true);
  const [dependentsColumn, setDependentsColumn] = useState([]);
  const handleInputChange1 = (event, index) => {
    const { name, value } = event.target;
    const list = [...dependents];
    list[index][name] = value;
    setDependents(list);
  };
  const handleInputChange2 = (e, name, index) => {
    const { value } = e.target;
    const list = [...attributes];
    list[index][name] = value;
    setAttributes(list);
  };
  const deleteHandle1 = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };
  const AddCustomAttributes = () => {
    const attribute = {
      key: "",
      value: "",
    };
    setAttributes([...attributes, attribute]);
  };
  const handleAdd = () => {
    const dependant = {
      name: "",
      age: "",
      relationship: "",

      statusType: "",
    };
    setDependents1([...dependents1, dependant]);
  };
  const handleInputChange = (e, name, index) => {
    const { value } = e.target;
    const list = [...dependents1];
    list[index][name] = value;
    setDependents1(list);
  };
  const deleteHandle = (index) => {
    const updatedDependents = [...dependents1];
    updatedDependents.splice(index, 1);
    setDependents1(updatedDependents);
  };
  const dependancyStatus = [
    "Student",
    "Under graduate",
    "Post graduate",
    "Other",
  ];
  const relationship = ["Son", "Daughter"];

  return (
    <div className="d-flex flex-column align-items-center gradient-bg bg-primary vh-100">
      <h1 style={{ marginBottom: "20px", marginTop: "20px" }}>
        Personal Informations
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="mb-3">
          Name:
          <input
            required
            type="text"
            value={record.Name}
            onChange={(e) => setRecord({ ...record, Name: e.target.value })}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Birthday:
          <input
            required
            type="date"
            value={
              record.Birthday
                ? new Date(record.Birthday).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setRecord({
                ...record,
                Birthday: e.target.value,
              })
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Gender:
          <select
            required
            value={record.Gender}
            onChange={(e) => {
              setRecord({ ...record, Gender: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            {genderList.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Branch:
          <select
            required
            value={record.Branch_Name}
            onChange={(e) => {
              setRecord({ ...record, Branch_Name: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            {branchList.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Department:
          <select
            required
            value={record.Department}
            onChange={(e) => {
              setRecord({ ...record, Department: e.target.value });
            }}
            style={{ marginLeft: "10px" }}
          >
            {departmentList.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Contact Number:
          <input
            required
            type="tel"
            value={record.Emergency_contact_Number}
            onChange={(e) =>
              setRecord({ ...record, Emergency_contact_Number: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />

        <label className="mb-3">
          Marital Status:
          <select
            required
            value={record.Marital_status}
            onChange={(e) =>
              setRecord({ ...record, Marital_status: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            {maritalStatusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Job Title:
          <span style={{ marginLeft: "10px" }}>{record.Job_Title}</span>
        </label>

        <br />

        <label className="mb-3">
          Status:
          <select
            required
            value={record.Status_Type}
            onChange={(e) =>
              setRecord({ ...record, Status_Type: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            {statusList.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label className="mb-3">
          Pay Grade:
          <select
            required
            value={record.Pay_grade}
            onChange={(e) =>
              setRecord({ ...record, Pay_grade: e.target.value })
            }
            style={{ marginLeft: "10px" }}
          >
            {payGradeList.map((payGrade, index) => (
              <option key={index} value={payGrade}>
                {payGrade}
              </option>
            ))}
          </select>
        </label>
        <br />
        {attributes.map((attribute, idx) => {
          return (
            <div key={idx} style={{ marginTop: "20px" }}>
              <label>
                Attribute:
                <input
                  required
                  type="text"
                  value={attribute.key}
                  onChange={(e) => handleInputChange2(e, "key", idx)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
              </label>
              <label>
                Value:
                <input
                  required
                  type="text"
                  value={attribute.value}
                  onChange={(e) => handleInputChange2(e, "value", idx)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
              </label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => deleteHandle1(idx)}
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  marginLeft: "20px",
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <button
          onClick={() => AddCustomAttributes()}
          disabled={formSubmitted}
          type="button"
          className="btn btn-primary"
          style={{
            color: "white",
            fontSize: "16px",
            marginRight: "50px",
            marginTop: "20px",
          }}
        >
          Add New Custom Attribute
        </button>
        <br />

        {!isNull1 ? (
          <>
            <h1>Dependents Details</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  {visibleColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dependents.map((row, index) => (
                  <tr key={row.name}>
                    {visibleColumns.map((col) => (
                      <td key={`${row.name}-${col}`}>
                        <input
                          type="text"
                          name={col}
                          value={row[col]}
                          onChange={(event) => handleInputChange1(event, index)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <></>
        )}

        {dependents1.map((dependant, idx) => {
          return (
            <div key={idx} style={{ marginTop: "20px" }}>
              <label>
                Name:
                <input
                  required
                  type="text"
                  value={dependant.name}
                  onChange={(e) => handleInputChange(e, "name", idx)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
              </label>
              <label styles={{ marginLeft: "10px" }}>
                Relationship:
                <select
                  value={dependant.relationship}
                  onChange={(e) => handleInputChange(e, "relationship", idx)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <option value="">Select a Relationship</option>
                  {relationship.map((relationship, index) => (
                    <option key={index} value={relationship}>
                      {relationship}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Age:
                <input
                  required
                  type="text"
                  value={dependant.age}
                  onChange={(e) => handleInputChange(e, "age", idx)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
              </label>
              <label>
                Status:
                <select
                  required
                  value={dependant.statusType}
                  onChange={(e) => handleInputChange(e, "statusType", idx)}
                  style={{ marginLeft: "10px" }}
                >
                  <option value="">Select a Status</option>
                  {dependancyStatus.map((dependancyStatus, index) => (
                    <option key={index} value={dependancyStatus}>
                      {dependancyStatus}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => deleteHandle(idx)}
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  marginLeft: "20px",
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <button
          onClick={() => handleAdd()}
          type="button"
          disabled={formSubmitted}
          className="btn btn-primary"
          style={{
            color: "white",
            fontSize: "16px",
            marginRight: "50px",
            marginTop: "20px",
          }}
        >
          Add New Dependant
        </button>

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
        <button
          className="btn btn-primary"
          type="submit"
          value="Submit"
          style={{ marginTop: "20px" }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPI;
