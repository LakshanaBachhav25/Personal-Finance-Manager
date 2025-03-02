import mongoose from "mongoose";
import Expense from "../models/expenseSchema.js";

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received Expense ID:", id); 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid MongoDB ObjectId:", id);
            return res.status(400).json({ error: "Invalid expense ID" }); 
        }

        const updatedTransaction = await Expense.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTransaction) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json({ message: "Expense updated successfully", updatedTransaction });

    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ error: error.message || "Server error" });
    }
};



export { updateTransaction };
