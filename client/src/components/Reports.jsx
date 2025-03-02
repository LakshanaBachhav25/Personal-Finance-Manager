import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import NavbarComponent from "./NavbarComponent";

const Reports = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("User Logged Out");
    navigate("/");
  }
  
  const categoryData = [
    { name: "Food", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Health", value: 150 },
    { name: "Other", value: 100 },
  ];

  const incomeExpenseData = [
    { name: "Income", amount: 5000 },
    { name: "Expense", amount: 3000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

  return (
    <>
      <NavbarComponent handleLogout={handleLogout} />
      <div className="container-fluid bg-white vh-90 overflow-hidden">
        <div className="container mt-4 d-flex justify-content-center align-items-center">
          <h3 className="text-center mb-4  w-100 fw-bold" style={{ color: "#6f42c1" }}>"View clear Financial Reports easily!"</h3>
        </div>

        <div className="container d-flex justify-content-center align-items-center mt-4">
          <div className="row w-100">

            
            <div className="col-md-6 d-flex justify-content-center fw-bold">
              <ResponsiveContainer width={400} height={300}>
                <BarChart data={incomeExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

           
            <div className="col-md-6 d-flex justify-content-center fw-bold">
              <ResponsiveContainer width={400} height={400}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={150} fill="#8884d8" dataKey="value" label>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;

