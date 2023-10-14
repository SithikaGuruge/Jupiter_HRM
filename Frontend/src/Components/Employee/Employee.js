import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Employee.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Employee = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [auth, setAuth] = useState(false);
  const [record, setRecord] = useState();

  useEffect(() => {
    axios.get("http://localhost:5001/", username).then((response) => {
      if (response.data.message === "Success") {
        setAuth(true);
        setRecord(response.data.job);
      } else {
        setAuth(false);
      }
    });
  }, []);

  //post user name and password to the backend and check whether it is correct
  axios.defaults.withCredentials = true;

  const fetchdata = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username: username,
        password: password,
      });

      console.log(response.data.status);

      if (response.data.status === "success") {
        navigate("/login/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error(err.status);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetchdata();
  }

  return (
    <div>
      {auth ? (
        navigate(`/login/Employee:${record}`)
      ) : (
        <div className="gradient-bg vh-100">
          <div className="d-flex justify-content-center align-items-center gradient-bg bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username">Username</label>{" "}
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    className="form-control rounded-0"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>{" "}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className="form-control rounded-0"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <button className="btn btn-success w-100 rounded-0">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
