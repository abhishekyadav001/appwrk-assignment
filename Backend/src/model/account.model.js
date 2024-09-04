const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionType:{
      type:String,
      enum:['credit','debit'],
      required:true
    },
    amount:{
      type:Number,
      required:true,
      min:[0,"Sorry! Can not enter amount less than 0"]
    }
    // Additional fields for account details (example, account type, status, etc.)
  },
  { timestamps: true }
);
const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = { transactionModel };
