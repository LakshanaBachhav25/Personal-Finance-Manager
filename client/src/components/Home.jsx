import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import balanceImg from "../assets/balance.jpg";
import incomeImg from "../assets/income.avif";
import expenseImg from "../assets/expense.jpg";
import AddExpenseModal from "./AddExpenseModal";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    console.log("User Logged Out");
    navigate("/");
  };

  return (
    <div className="container-fluid bg-white min-vh-100">
      <NavbarComponent handleLogout={handleLogout} />

      <div className="text-center my-4 text-primary">
        <h3 className="fw-bold" style={{ margin: "40px 0", textAlign: "center", fontFamily: "Poppins" }}>
          "Smart budgeting made simple - track, save, and grow!"
        </h3>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New Transaction
        </button>
      </div>
      <AddExpenseModal show={showModal} handleClose={() => setShowModal(false)} />

      <div className="d-flex justify-content-around flex-wrap mb-4">
        <div className="card text-center p-3 shadow" style={{ width: "20rem", height: "25rem" }}>
          <img src={balanceImg} alt="Total Balance" className="card-img-top" style={{ height: "300px", objectFit: "contain" }} />
          <div className="card-body">
            <h5 className="fw-bold">Total Balance</h5>
            <h3>$5,000</h3>
          </div>
        </div>

        <div className="card text-center p-3 shadow" style={{ width: "20rem", height: "25rem" }}>
          <img src={incomeImg} alt="Total Income" className="card-img-top" style={{ height: "300px", objectFit: "contain" }} />
          <div className="card-body">
            <h5 className="fw-bold">Total Income</h5>
            <h3>${localStorage.getItem("totalIncome") || "0"}</h3>
          </div>
        </div>

        <div className="card text-center p-3 shadow" style={{ width: "20rem", height: "25rem" }}>
          <img src={expenseImg} alt="Total Expenses" className="card-img-top" style={{ height: "300px", objectFit: "contain" }} />
          <div className="card-body">
            <h5 className="fw-bold">Total Expenses</h5>
            <h3>$3,000</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

