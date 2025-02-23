import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", userData);
      alert("Registration Successful! Please Login.");
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert("Registration Failed. Try Again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#6f42c1" }}>Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input type="text" className="form-control" name="name" value={userData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email Address</label>
            <input type="email" className="form-control" name="email" value={userData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" name="password" value={userData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold" style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}>Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <a href="/" className="text-primary fw-bold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
