import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import { getExpenses, deleteExpense } from "../services/api";
import EditFormModel from "./EditFormModel";


const Transactions = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState("all");
  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, transactionType, filter]);

  const fetchTransactions = async () => {
    const data = await getExpenses();
    if (!data.error) {
      setTransactions(data);
    } else {
      console.error("Error fetching transactions:", data.error);
    }
  };
  const applyFilters = () => {
    let filteredData = [...transactions];
  
    if (transactionType !== "all") {
      filteredData = filteredData.filter((t) => t.type.toLowerCase() === transactionType.toLowerCase());
    }
  
    const now = new Date();
    filteredData = filteredData.filter((t) => {
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
  
    
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    setFilteredTransactions(filteredData);
  };
  
  

  const handleLogout = () => {
    console.log("User Logged Out");
    navigate("/");
  };

const handleDelete = async (id) => {
  console.log(`Deleting expense ID: ${id}`);
  console.log(`API Endpoint: http://localhost:5000/api/expenses/${id}`);

  const response = await deleteExpense(id);
  if (!response.error) {
    setTransactions(transactions.filter((t) => t._id !== id));
  } else {
    console.error("Failed to delete transaction:", response.error);
  }
};

const handleEdit = (transaction) => {
  setSelectedTransaction(transaction); // Store selected transaction
  setShowModal(true); // Show modal
};

const handleUpdate = async (transactionId, updatedData) => {
  try {
      console.log("Sending Expense ID:", transactionId); // Debugging ✅

      const response = await fetch(`http://localhost:5000/api/transactions/${transactionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (!response.ok) {
          throw new Error(result.error || "Failed to update transaction");
      }

      console.log("Transaction updated:", result);
  } catch (error) {
      console.error("Error updating transaction:", error);
  }
};






  return (
    <>
      <NavbarComponent handleLogout={handleLogout} />
      <Container>
        <h3 className="text-center my-4 fw-bold" style={{ color: "#6f42c1" }}>"View and manage all your Transactions easily!"</h3>

        <div className="d-flex justify-content-center mb-4 mt-4">
          {/* Transaction Type Filter */}
          <select className="form-select w-auto me-2 fw-bold" onChange={(e) => setTransactionType(e.target.value)}>
            <option value="all">Show All</option>
            <option value="Income">Show Income</option>
            <option value="Expense">Show Expenses</option>
          </select>

          {/* Date Filter */}
          <select className="form-select w-auto fw-bold" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Transactions</option>
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
            {filteredTransactions.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>${t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>
                 <Button variant="warning" size="sm" onClick={() => handleEdit(t)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(t._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <EditFormModel
        showModal={showModal}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        handleUpdate={handleUpdate}
        setShowModal={setShowModal}
      />


      </Container>
    </>
  );
};

export default Transactions;
