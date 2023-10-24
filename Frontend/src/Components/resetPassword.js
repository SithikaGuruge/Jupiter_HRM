import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  axios.defaults.withCredentials = true;
  const goBack = () => {
    navigate(-1);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match");
    } else {
      axios
        .post("http://localhost:5001/api/reset-password", {
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
        .then((response) => {
          setErrorMessage(response.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
      setErrorMessage("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gradient-bg bg-primary vh-100 text-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="current-password">Current Password:</label>
          <input
            required
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="new-password">New Password:</label>
          <input
            required
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-new-password">Confirm New Password:</label>
          <input
            required
            type="password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="mb-3">
          Reset Password
        </button>
      </form>
      <button onClick={goBack} className="primary">
        Go Back
      </button>
    </div>
  );
};

export default ResetPassword;
