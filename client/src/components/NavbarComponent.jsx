import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { HouseDoor, ListCheck, BarChart, Wallet2 } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const NavbarComponent = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow p-3">
      <div className="container">
        <a className="navbar-brand fw-bold text-black" href="#">Personal Finance Manager</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav custom-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/home")}>
                <HouseDoor className="me-2" /> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/transactions")}>
                <ListCheck className="me-2" /> Transactions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/reports")}>
                <BarChart className="me-2" /> Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => navigate("/setbudget")}>
                <Wallet2 className="me-2" /> Budgets
              </a>
            </li>
          </ul>
          <button className="btn btn-danger ms-3 d-flex align-items-center" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
