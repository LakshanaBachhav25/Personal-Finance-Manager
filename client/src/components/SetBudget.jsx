import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

const SetBudget = () => {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState([
    { category: "Food", limit: 5000, spent: 2000 },
    { category: "Transport", limit: 3000, spent: 1500 },
  ]);
  const [categories, setCategories] = useState(["Food", "Transport", "Entertainment"]);
  const [budgetInputs, setBudgetInputs] = useState({ category: "", limit: "" });

  const handleLogout = () => {
    console.log("User Logged Out");
    navigate("/");
  };

  const handleSetBudget = () => {
    const { category, limit } = budgetInputs;
    if (category && limit) {
      setBudgets((prevBudgets) => {
        const existing = prevBudgets.find((b) => b.category === category);
        if (existing) {
          return prevBudgets.map((b) => (b.category === category ? { ...b, limit: parseFloat(limit) } : b));
        } else {
          return [...prevBudgets, { category, limit: parseFloat(limit), spent: 0 }];
        }
      });
      setBudgetInputs({ category: "", limit: "" });
    }
  };

  return (
    <>
      <NavbarComponent handleLogout={handleLogout} />
      <div className="container">
        <h3 className="text-center mb-4 mt-4 fw-bold" style={{ color: "#6f42c1" }} >
          "Set your budget here and take control of your expenses!"
        </h3>

        {/* Budget Input Form */}
        <div className="d-flex mb-4">
          <select
            className="form-select me-2 fw-bold"
            value={budgetInputs.category}
            onChange={(e) => setBudgetInputs({ ...budgetInputs, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Set Limit"
            value={budgetInputs.limit}
            onChange={(e) => setBudgetInputs({ ...budgetInputs, limit: e.target.value })}
            className="form-control me-2 fw-bold"
          />
          <button className="btn btn-primary" onClick={handleSetBudget}>Set Budget</button>
        </div>

        {/* Budget List */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget Limit</th>
              <th>Amount Spent</th>
              <th>Remaining</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => (
              <tr key={b.category}>
                <td>{b.category}</td>
                <td>₹{b.limit}</td>
                <td>₹{b.spent}</td>
                <td>₹{b.limit - b.spent}</td>
                <td>
                  <div className="progress">
                    <div
                      className={`progress-bar ${b.spent / b.limit > 0.8 ? "bg-danger" : "bg-success"}`}
                      role="progressbar"
                      style={{ width: `${(b.spent / b.limit) * 100}%` }}
                      aria-valuenow={(b.spent / b.limit) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.round((b.spent / b.limit) * 100)}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SetBudget;
