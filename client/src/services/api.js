import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await API.post("/users/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


export const getCurrentUser = async (token) => {
  try {
    const response = await API.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch User Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


export const addExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses/add", expenseData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Failed to add expense" };
  }
};


export const getExpenses = async () => {
  try {
    const response = await API.get("/expenses/");
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Failed to fetch expenses" };
  }
};

export const deleteExpense = async (id) => { 
  try {
    const response = await API.delete(`/expenses/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    return { error: error.message };
  }
};

export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const response = await API.put(`/transactions/${transactionId}`, updatedData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Failed to update transaction" };
  }
};

export default API;
