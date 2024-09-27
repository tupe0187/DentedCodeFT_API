import express from "express";
import {
  deleteTransactions,
  getTransactions,
  insertTransaction,
} from "../models/transaction/TransactionModel.js";

const router = express.Router();

//insert transaction
router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    const result = await insertTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New transaction added successfully!",
        })
      : res.json({
          status: "error",
          message: "Unable to add new transaction, try again later",
        });
  } catch (error) {
    next(error);
  }
});

// Return all the transactions for the specfic user
router.get("/", async (req, res, next) => {
  try {
    //get all transactions
    const { _id } = req.userInfo;

    const transactions = (await getTransactions(_id)) || [];
    res.json({
      status: "success",
      message: "here are the transactions",
      transactions,
    });
  } catch (error) {
    next(error);
  }
});

//Delete transactioin(s)
router.delete("/", async (req, res, next) => {
  try {
    // receive ids[] and _id of user
    const ids = req.body;
    const { _id } = req.userInfo;
    console.log(ids, _id);
    // Perform the deletion query
    const result = await deleteTransactions(_id, ids);

    res.json({
      status: "success",
      message: result.deletedCount + " transactions has been deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
