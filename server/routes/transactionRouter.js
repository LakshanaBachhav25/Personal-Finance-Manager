import express from "express";
import { updateTransaction } from "../controllers/transactionController.js";

const router = express.Router();
router.put("/transactions/:id", updateTransaction);

export default router; 

