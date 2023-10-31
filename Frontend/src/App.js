import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./Components/about";
import Dashboard from "./Components/dashboard";
import Employee from "./Components/Employee/Employee";
import ManUI from "./Components/ManUI/ManUI";
import EmployeeUI from "./Components/EmpUI/EmployeeUI";
import SupervisorUI from "./Components/SupervisorUI/SupervisorUI";
import PersonalInfo from "./Components/EmpUI/PersonalInfo";
import AdminUI from "./Components/Admin/AdminUi";
import AddEmployee from "./Components/ManUI/AddEmployee";
import EmployeeInfo from "./Components/ManUI/EmployeeInfo";
import ViewEmployee from "./Components/ManUI/ViewEmployee";
import EditEmployee from "./Components/ManUI/EditEmployee";
import LeaveRequest from "./Components/EmpUI/LeaveRequest";
import LoginUI from "./Components/login";
import AddHRManager from "./Components/Admin/AddHrManager";
import EditPI from "./Components/ManUI/EditPI";
import ResetPassword from "./Components/resetPassword";
import LeaveApplication from "./Components/SupervisorUI/LeaveApplication";
function App() {
  window.addEventListener("scroll", function () {
    var footer = document.querySelector("footer");
    if (window.scrollY > 100) {
      footer.classList.add("sticky-footer");
    } else {
      footer.classList.remove("sticky-footer");
    }
  });

  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Employee />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login/Employee:JT001" element={<AdminUI />}></Route>
            <Route path="/login/Employee:JT002" element={<ManUI />}></Route>
            <Route
              path="/login/Employee:JT003"
              element={<SupervisorUI />}
            ></Route>
            <Route
              path="/login/Employee:JT004"
              element={<SupervisorUI />}
            ></Route>
            <Route
              path="/login/Employee:JT009"
              element={<SupervisorUI />}
            ></Route>
            <Route
              path="/login/Employee:JT005"
              element={<SupervisorUI />}
            ></Route>
            <Route
              path="/login/Employee:JT006"
              element={<EmployeeUI />}
            ></Route>
            <Route
              path="/login/Employee:JT007"
              element={<EmployeeUI />}
            ></Route>
            <Route
              path="/login/Employee:JT008"
              element={<EmployeeUI />}
            ></Route>
            <Route
              path="/login/Employee/EmployeeUI/PersonalInfo"
              element={<PersonalInfo />}
            ></Route>
            <Route path="/login/Admin/AdminUI" element={<AdminUI />}></Route>

            <Route
              path="/login/Employee/ManUI/EditPI"
              element={<EditPI />}
            ></Route>
            <Route
              path="/login/Employee/ManUI/AddEmployee"
              element={<AddEmployee />}
            ></Route>
            <Route
              path="/login/Employee/ManUI/EmployeeInfo"
              element={<EmployeeInfo />}
            ></Route>
            <Route
              path="/login/Employee/ManUI/ViewEmployee"
              element={<ViewEmployee />}
            ></Route>
            <Route
              path="/login/Employee/ManUI/EditEmployee"
              element={<EditEmployee />}
            ></Route>
            <Route
              path="/login/Employee/EmployeeUI/request-leave"
              element={<LeaveRequest />}
            ></Route>
            <Route
              path="/login/Admin/AddHrManager"
              element={<AddHRManager />}
            ></Route>
            <Route path="/login/home" element={<LoginUI />}></Route>
            <Route
              path="/login/Employee/reset-password"
              element={<ResetPassword />}
            ></Route>
            <Route
              path="/login/Employee/SupUI/leaveApplication"
              element={<LeaveApplication />}
            ></Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
