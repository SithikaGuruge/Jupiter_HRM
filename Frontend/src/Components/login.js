import axios from "axios";
import { Link } from "react-router-dom";
//import bootsrap from "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginUI = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/check")
      .then((response) => {
        if (response.data.valid) {
          setRole(response.data.role);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {role === "Admin"
        ? navigate("/login/Admin")
        : navigate(`/login/Employee:${role}`)}
    </div>
  );
};

export default LoginUI;
