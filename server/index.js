import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/Database.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRouter.js";
import transactionRoutes from "./routes/transactionRouter.js"


dotenv.config();


connectDB();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api", transactionRoutes);

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("Server is Running & MongoDB is Connected!");
});


app.use((err, req, res, next) => {
  console.error("Backend Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
