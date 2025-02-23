import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
// import TableView from "./components/TableView";
// import GraphView from "./components/GraphView";
import "./components/home.css"
import Transactions from "./components/Transactions";
import Reports from "./components/Reports";
import SetBudget from "./components/SetBudget";
// import NavbarComponent from "./components/NavbarComponent";
// import EnterIncome from "./components/EnterIncome";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={< Reports />} />
        <Route path="/setbudget" element={< SetBudget />} />
        {/* <Route path="/navbarcomponent" element={<NavbarComponent />} /> */}
        {/* <Route path="/tableview" element={<TableView />} />
        <Route path="/graphview" element={<GraphView />} /> */}
        {/* <Route path="/enter-income" element={<EnterIncome />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
