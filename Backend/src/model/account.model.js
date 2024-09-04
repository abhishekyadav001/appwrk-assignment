const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true },
    balance: { type: Number, required: true },

    // Additional fields for account details (example, account type, status, etc.)
  },
  { timestamps: true }
);
const accountModel = mongoose.model("Account", accountSchema);
module.exports = { accountModel };
