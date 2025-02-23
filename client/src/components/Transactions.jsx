import React, { useState } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState("Income");
  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Salary", amount: 5000, category: "Other", type: "Income", date: "2025-02-20", description: "Monthly salary" },
    { id: 2, title: "Grocery", amount: 200, category: "Food", type: "Expense", date: "2025-02-21", description: "Bought vegetables" },
    { id: 3, title: "Fuel", amount: 100, category: "Transport", type: "Expense", date: "2025-02-19", description: "Car fuel" },
  ]);

  const handleLogout = () => {
    console.log("User Logged Out");
    navigate("/");
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit transaction with ID: ${id}`);
  };

  const filterTransactions = (transactions) => {
    const now = new Date();
    return transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      if (filter === "lastWeek") {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return transactionDate >= lastWeek;
      } else if (filter === "lastMonth") {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return transactionDate >= lastMonth;
      }
      return true;
    });
  };

  return (
    <>
      <NavbarComponent handleLogout={handleLogout} />
      <Container>
        <h3 className="text-center my-4 fw-bold" style={{ color: "#6f42c1" }} >"View and manage all your Transactions easily!"</h3>

        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button variant={transactionType === "Income" ? "success" : "outline-success"} className="me-2 fw-bold" onClick={() => setTransactionType("Income")}>
            Show Income
          </Button>
          <Button variant={transactionType === "Expense" ? "primary" : "outline-primary"} className="me-2 fw-bold" onClick={() => setTransactionType("Expense")}>
            Show Expenses
          </Button>

          <select className="form-select w-auto outline-secondary fw-bold" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Transactions</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
          </select>

        </div>


        <Table>
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions(transactions)
              .filter((t) => t.type === transactionType)
              .map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>${t.amount}</td>
                  <td>{t.category}</td>
                  <td>{t.type}</td>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(t.id)}>Edit</Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(t.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Transactions;
