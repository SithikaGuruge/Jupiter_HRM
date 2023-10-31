const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var employeeId = "";
const app = express();
var personalID;
const session = require("express-session");
const argon2 = require("argon2");
const dotenv = require("dotenv");
dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 60 },
  })
);

app.use(express.json());
const port = 5001;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

//get leave applications relevent to supervisor
app.get("/api/SupUI/leaveApplications", (req, res) => {
  db.query(
    "SELECT * FROM leave_application where Employee_ID IN (SELECT Employee_ID FROM employee where Supervisor_ID = ?) and Approval_status = 'Pending' ",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//post edited leave applications
app.post("/api/SupUI/edited/leaveApplications", (req, res) => {
  console.log("Edited data fetch from server:");

  const data = req.body.record;
  console.log(data);
  // console.log("data", data);

  const sql3 = "CALL Remaining_leave_count(?,?,?,?,?,?)";
  db.query(
    sql3,
    [
      data.Leave_Application_ID,
      data.Employee_ID,
      data.LeaveType,
      data.Start_Date.split("T")[0],
      data.End_Date.split("T")[0],
      data.Approval_status,
    ],
    (err) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.json({ error: "Internal server error" });
        return;
      } else {
        console.log("success");
        return res.json({ message: "Data Updated Successfully" });
      }
    }
  );
});

//get custom attributes
app.get("/api/personal/customAttributes", (req, res) => {
  db.query(
    "SELECT * FROM custom_attributes where Employee_ID = ?",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.get("/api/employee/customAttributes", (req, res) => {
  db.query(
    "SELECT * FROM custom_attributes where Employee_ID = ?",
    [employeeId],
    (err, rows, fields) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//get dependent details
app.get("/api/dependants", (req, res) => {
  db.query(
    "SELECT * FROM dependants where Employee_ID = ?",
    [employeeId],
    (err, rows, fields) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//get personal dependents details
app.get("/api/personal/dependants", (req, res) => {
  db.query(
    "SELECT * FROM dependants where Employee_ID = ?",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//reset password
app.post("/api/reset-password", (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const sql = "SELECT password FROM loginWithJobTitle WHERE Employee_ID = ?";
  db.query(sql, [personalID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const hashedPassword = results[0].password;
    argon2.verify(hashedPassword, currentPassword).then((match) => {
      if (match) {
        console.log("Password matched!");
        argon2.hash(newPassword).then((hash) => {
          const sql2 = "CALL UpdatePassword(?,?)";
          db.query(sql2, [personalID, hash], (err, results) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({
              success: true,
              message: "Password reset successfully",
            });
          });
        });
      } else {
        console.log("Password did not match!");
        return res.json({ message: "Current password is incorrect" });
      }
    });
  });
});

//get job title list
app.get("/api/jobTitle", (req, res) => {
  db.query(
    "SELECT Job_Title FROM employee_job_title where Job_Title_ID != 'JT001' and Job_Title_ID != 'JT002' ",
    (err, rows, fields) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//get Branches
app.get("/api/branch", (req, res) => {
  db.query("SELECT Branch_Name FROM branch", (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//get department

app.get("/api/department", (req, res) => {
  db.query("SELECT Department_Name FROM department", (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//get pay grade list
app.get("/api/payGrade", (req, res) => {
  db.query("SELECT Pay_Grade FROM employee_pay_grade", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//get status list
app.get("/api/status", (req, res) => {
  db.query("SELECT Status_Type FROM employee_status", (err, rows, fields) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

//post details of leaveRequest
app.post("/api/leaveRequest", (req, res) => {
  db.query(
    "INSERT INTO leave_application(Employee_ID, LeaveType, Start_Date, End_Date, Approval_status) VALUES (?,?,?,?,?)",
    [
      personalID,
      req.body.LeaveType,
      req.body.StartDate,
      req.body.EndDate,
      "Pending",
    ],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.json({
          error: "Internal server error",
          message: "Error sending leave request",
        });
        return;
      } else {
        console.log(rows);
        res.json({ message: "Leave request sent successfully" });
      }
    }
  );
});

//get leave Types
app.get("/api/leaveTypes", (req, res) => {
  rows = ["Annual", "Casual", "Maternity", "No-pay"];
  res.json(rows);
});

//get employee leave details
app.get("/api/leaveDetails", (req, res) => {
  db.query(
    "SELECT * FROM employee_leave_details where Employee_ID = ?",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//post edited data
// app.post("/api/ManUI/EditPI/edited", (req, res) => {
//   console.log("Edited data fetch from server:");
//   console.log(req.body);
//   const data = req.body.Dependents;
//   console.log("data", data);
//   db.query(
//     "CALL UpdateEmployee(?,?,?,?,?,?,?,?,?,?,?,?)",
//     [
//       req.body.EmployeeID,
//       req.body.Name,
//       req.body.Birthday,
//       req.body.ContactNumber,
//       req.body.MaritalStatus,
//       req.body.Branch_Name,
//       req.body.Status,
//       req.body.Job_Title,
//       req.body.PayGrade,
//       req.body.Supervisor,
//       req.body.Department,
//       req.body.Gender,
//     ],
//     (err, rows) => {
//       if (err) {
//         console.error("Error querying MySQL:", err);
//         res.json({
//           Message: "Internal server error",
//           error: "Internal server error",
//         });
//       } else {
//         data.forEach((element) => {
//           const sql3 = "CALL EditDependant(?,?,?,?,?)";
//           db.query(
//             sql3,
//             [
//               element.Name,
//               element.Age,
//               element.Relationship,
//               element.status,
//               element.Dependant_ID,
//             ],
//             (err, rows) => {
//               if (err) {
//                 console.error("Error querying MySQL:", err);
//                 res.json({
//                   Message: "Internal server error",
//                   error: "Internal server error",
//                 });
//               } else {
//                 return res.json({ message: "Data Updated Successfully" });
//               }
//             }
//           );
//         });
//       }
//     }
//   );
// });

app.post("/api/ManUI/EditPI/edited", (req, res) => {
  console.log("Edited data fetch from server:");
  console.log(req.body);
  const data = req.body.Dependents;
  console.log("data", data);
  const successMessages = []; // Store success messages for dependents

  db.query(
    "CALL UpdateEmployee(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.EmployeeID,
      req.body.Name,
      req.body.Birthday,
      req.body.ContactNumber,
      req.body.MaritalStatus,
      req.body.Branch_Name,
      req.body.Status,
      req.body.Job_Title,
      req.body.PayGrade,
      req.body.Supervisor,
      req.body.Department,
      req.body.Gender,
    ],
    (err, rows) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        return res.status(500).json({
          Message: "Internal server error",
          error: "Internal server error",
        });
      }

      // Use a Promise or async/await to ensure all dependent updates are complete
      const dependentPromises = data.map((element) => {
        return new Promise((resolve) => {
          const sql3 = "CALL EditDependant(?,?,?,?,?)";
          db.query(
            sql3,
            [
              element.Name,
              element.Age,
              element.Relationship,
              element.status,
              element.Dependant_ID,
            ],
            (err, rows) => {
              if (err) {
                console.error("Error querying MySQL:", err);
                successMessages.push("Dependent update failed");
              } else {
                successMessages.push("Dependent updated successfully");
              }
              resolve(); // Resolve the promise to continue processing
            }
          );
        });
      });

      // Wait for all dependent updates to complete
      Promise.all(dependentPromises).then(() => {
        if (successMessages.length > 0) {
          return res.json({
            message: "Data Updated Successfully",
            successMessages,
          });
        } else {
          return res.json({ message: "Data Updated Successfully" });
        }
      });
    }
  );
});

//post relavent employees ID
app.post("/api/send-employee-id", (req, res) => {
  employeeId = req.body.Employee_ID;
  console.log(employeeId);
  res.send(employeeId);
});

//get relavent employee Informations
app.get("/api/employeeInfo/employee", (req, res) => {
  db.query(
    "select * from getpersonalinfo where Employee_ID = ?",
    [employeeId],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//get relavent dependants details
app.get("/api/dependantsDetails/employee", (req, res) => {
  db.query(
    "select Name,Age,Relationship,status as Status from dependants where Employee_ID = ?",
    [employeeId],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log("dependents: ", rows);

        res.json(rows);
      }
    }
  );
});

//Get all employee informations
app.get("/api/employeeInfo", (req, res) => {
  db.query(
    "SELECT Employee_ID, Name FROM employee where Employee_ID != ? ",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

//Post employee details
app.post("/api/employee/addEmployee", (req, res) => {
  const sql2 = "SELECT getLastEmployeeID() AS lastEmployeeID";
  var data = req.body.DependantsDetails;
  var attributes = req.body.CustomAttributes;
  console.log("Attributes", attributes);

  db.query(sql2, (err, rows) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      return res.status(500).json({ Message: "Internal server error" });
    }

    const lastEmployeeID = rows[0].lastEmployeeID;

    // Use lastEmployeeID inside this scope
    argon2.hash(`${lastEmployeeID}@Jupiter`).then((hash) => {
      console.log("Password", `${lastEmployeeID}@Jupiter`);
      const sql = "CALL AddEmployeeAndUserAccount(?,?,?,?,?,?,?,?,?,?,?,?,?)";
      db.query(
        sql,
        [
          req.body.Name,
          req.body.Birthday,
          req.body.ContactNumber,
          req.body.MaritalStatus,
          req.body.Name,
          hash,
          req.body.Branch_Name,
          req.body.Status,
          req.body.Job_Title,
          req.body.PayGrade,
          req.body.Supervisor,
          req.body.Department,
          req.body.Gender,
        ],
        (err, rows) => {
          if (err) {
            console.error("Error querying MySQL:", err);
            return res.status(500).json({ Message: "Internal server error" });
          } else {
            console.log(rows);

            data.forEach((element) => {
              if (
                element.name === "" ||
                element.age === "" ||
                element.relationship === "" ||
                element.statusType === ""
              ) {
                return;
              }
              const sql3 = "CALL AddDependant(?,?,?,?,?)";
              db.query(
                sql3,
                [
                  lastEmployeeID,
                  element.name,
                  element.age,
                  element.relationship,
                  element.statusType,
                ],
                (err, rows) => {
                  if (err) {
                    console.error("Error querying MySQL:", err);
                    return res
                      .status(500)
                      .json({ Message: "Internal server error" });
                  } else {
                    attributes.forEach((element) => {
                      if (element.key === "" || element.value === "") {
                        console.log("Attribute is empty");
                        return;
                      }
                      const sql4 = "CALL AddCustomAttribute(?,?,?)";
                      console.log("Attribute sql4", element.key, element.value);
                      db.query(
                        sql4,
                        [lastEmployeeID, element.key, element.value],
                        (err) => {
                          if (err) {
                            console.error("Error querying MySQL:", err);
                            return res
                              .status(500)
                              .json({ Message: "Internal server error" });
                          }
                        }
                      );
                    });
                  }
                }
              );
            });
            res.json({ Message: "Employee added successfully" });
          }
        }
      );
    });
  });
});

//get supervisor relevent to job title
app.post("/api/supervisorList", (req, res) => {
  console.log(req.body.jobTitle);
  var jobTitle = req.body.jobTitle;
  switch (jobTitle) {
    case "Senior Software Engineer":
    case "Senior QA Engineer":
    case "Senior Accountant":
    case "Senior HR Executive":
    case "Administrative Officer":
      jobTitle = "JT009";
      break;
    case "Software Engineer":
      jobTitle = "JT003";
      break;
    case "QA Engineer":
      jobTitle = "JT004";
      break;
    case "Accountant":
      jobTitle = "JT005";
      break;

    default:
      break;
  }
  db.query(
    "SELECT Name FROM employee where Job_Title_ID = ? and Employee_ID != ?",
    [jobTitle, employeeId],
    (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});
//View personal Information
app.get("/api/personalInfo", (req, res) => {
  db.query(
    "select * from getpersonalinfo where Employee_ID = ?",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log(rows);

        res.json(rows);
      }
    }
  );
});

//View dependants Details
app.get("/api/dependantsDetails", (req, res) => {
  db.query(
    "select Name,Age,Relationship,status as Status from dependants where Employee_ID = ?",
    [personalID],
    (err, rows, fields) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      } else {
        console.log("dependents: ", rows);

        res.json(rows);
      }
    }
  );
});

//User Login

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM loginWithJobTitle WHERE user_name = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      console.log("Invalid Password");
      return res.json({ message: "Invalid username or password" });
    }

    const hashedPassword = results[0].password;
    argon2.verify(hashedPassword, password).then((match) => {
      if (match) {
        console.log("Password matched!");
        personalID = results[0].Employee_ID;
        req.session.role = results[0].Job_Title_ID;

        res.json({
          status: "success",
          message: "Login successfull",
        });
        console.log("Login successfull");
      } else {
        console.log("Password did not match!");
        return res.json({ message: "Invalid username or password" });
      }
    });
  });
});
//clear cookies
app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout success" });
  req.session.destroy();
});

//check session
app.get("/api/check", (req, res) => {
  if (req.session.role) {
    return res.json({
      valid: true,
      role: req.session.role,
    });
  } else {
    return res.json({
      valid: false,
    });
  }
});
//post new dependants

app.post("/api/ManUI/EditPI/newDependents", (req, res) => {
  const depend = req.body.Dependents;
  depend.forEach((element) => {
    const sql = "CALL AddDependant(?,?,?,?,?)";
    db.query(
      sql,
      [
        req.body.EmployeeID,
        element.name,
        element.age,
        element.relationship,
        element.statusType,
      ],
      (err, rows) => {
        if (err) {
          console.error("Error querying MySQL:", err);
          return res.status(500).json({ Message: "Internal server error" });
        } else {
          console.log(rows);
          res.json({ Message: "Dependant added successfully" });
        }
      }
    );
  }); //end of forEach
});
//post new custom attributes
app.post("/api/ManUI/EditPI/newCustomAttributes", (req, res) => {
  const attributes = req.body.Attributes;

  const sql = "CALL AddCustomAttribute(?,?,?)";
  attributes.forEach((element) => {
    db.query(
      sql,
      [req.body.EmployeeID, element.key, element.value],
      (err, rows) => {
        if (err) {
          console.error("Error querying MySQL:", err);
          return res.status(500).json({ Message: "Internal server error" });
        } else {
          console.log(rows);
          res.json({ Message: "Custom Attribute added successfully" });
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log("Server is running on port5001");
});
