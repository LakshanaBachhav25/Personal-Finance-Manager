import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", userData);
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/home");
    } catch (error) {
      alert("Invalid Credentials. Try Again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#6f42c1" }}>Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email Address</label>
            <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold" style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}>Login</button>
        </form>
        <p className="mt-3 text-center ">
          Don't have an account? <a href="/register" className="text-primary fw-bold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
